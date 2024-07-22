import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services';
import { ExtendedFile, ROUTE_LIST, USER_TYPE } from 'src/app/core/utility/global-constant';
import { FileUploadService } from 'src/app/modules/content/services/file-upload-service/file-upload-service';

@Component({
  selector: 'unievent-artist-verify',
  templateUrl: './artist-verify.component.html',
  styleUrls: ['./artist-verify.component.scss']
})
export class ArtistVerifyComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFiles: Array<{ key: string, file: File }> = new Array();
  requestStatus:'not-verified'|'verified'|'requested'|'refused';
  formData: {
    name: string;
    surname: string;
    birthdate: Date;
    pIva: string;
    companyName: string;
    companyAddress: string
    pec: string;
    consentClauses: boolean
  } = {
      name: '',
      surname: '',
      birthdate: new Date(),
      pIva: '',
      companyName: '',
      companyAddress: '',
      pec: '',
      consentClauses: false
    }
  fileUrls:Array<string> = new Array();

  constructor(private http: HttpClient, private router:Router, private sanitizer: DomSanitizer, private userService: UserService, private toastr: ToastrService, private cookieService: CookieService, private fileService: FileUploadService) {
    let currentUser = (JSON.parse(this.cookieService.get("current_user")) as User);
    if(USER_TYPE[currentUser.t_type] === USER_TYPE.COMPANY){
      this.router.navigate([""])
    }
  }

  ngAfterViewInit(): void {
    this.requestStatus = 'not-verified';
    let t_alias_generated = (JSON.parse(this.cookieService.get("current_user")) as User).t_alias_generated;
    this.userService.getVerifyAccountStatus(t_alias_generated).subscribe(
      (response: any) => {
        let currentUser = (JSON.parse(this.cookieService.get("current_user")) as User);
        this.requestStatus = USER_TYPE[currentUser.t_type] === USER_TYPE.ARTIST ? "verified" : response.status;    
      },
      error => {
        this.toastr.error('Errore nel recupero dello stato della richiesta');
      }
    );
  }

  sendVerifyAccount() {
    this.userService.verifyAccount(this.formData.name, this.formData.surname, moment(this.formData.birthdate).format("DD-MM-YYYY"), this.formData.pIva, 
      this.formData.companyName, this.formData.companyAddress, this.formData.pec, this.formData.consentClauses, this.fileUrls, "requested", null, null).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.requestStatus = "requested";
          this.formData = {
            name: '',
            surname: '',
            birthdate: new Date(),
            pIva: '',
            companyName: '',
            companyAddress: '',
            pec: '',
            consentClauses: false
          }      
        },
        error => {
          this.toastr.error('Errore nella richiesta di verifica, controlla i dati e riprova');
        }
      );
    return true;
  }

  handleFileInput(fileInput: HTMLInputElement, key: string) {
    const files = fileInput.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i) as ExtendedFile;
        if (file) {
          file.preview = this.createFilePreview(file);
          this.fileService.uploadFileAzure(file).subscribe(event => {
            this.fileUrls.push(event.body.url);
          }, error => {
            console.error('Error uploading file', error);
          });
          const existingUploadIndex = this.uploadedFiles.findIndex(upload => upload.key === key);
          if (existingUploadIndex !== -1) {
            this.uploadedFiles[existingUploadIndex] = { key: key, file: file };
          } else {
            this.uploadedFiles.push({ key: key, file: file });
          }
        }
      }
    }
  }


  createFilePreview(file: ExtendedFile): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Ottieni l'anteprima dell'immagine come URL base64
      if (typeof reader.result === 'string') {
        file.preview = reader.result;
      }
    };
    return '';
  }

  openUploadPanel(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  searchUploadedFile(key: string): { key: string, file: File } | undefined {
    return this.uploadedFiles.find(upload => upload.key === key);
  }

  openImage(fileString: string): void {
    this.getImageBase64(fileString).then(base64 => {
      const win = window.open();
      if (win) {
        const img = new Image();
        img.src = base64;
        win.document.body.appendChild(img);
      }
    });
  }

  async getImageBase64(url: string): Promise<string> {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  getFileObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  setBlobUrl(file: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  downloadFile(fileUrl: string): void {
    this.getFileBase64(fileUrl).then(base64 => {
      const blob = this.base64ToBlob(base64);
      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = this.getFileNameFromUrl(fileUrl);
      anchor.click();

      // Pulisce l'URL del Blob dopo il download
      URL.revokeObjectURL(blobUrl);
    });
  }

  async getFileBase64(url: string): Promise<string> {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  getFileNameFromUrl(url: string): string {
    // Ottiene il nome del file dalla URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Determina il tipo MIME in base all'intestazione della stringa base64
    let mimeType = 'application/octet-stream'; // Tipo MIME di default
    if (base64.startsWith('data:image/jpeg')) {
      mimeType = 'image/jpeg';
    } else if (base64.startsWith('data:image/png')) {
      mimeType = 'image/png';
    }

    return new Blob([byteArray], { type: mimeType });
  }

  removeUploadedFile(object: { key: string, file: File }) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== object);
  }

  isValidForm() {
    //Ovviamente cambiare alcuni controlli con regex (tipo la pec);
    let valid = this.formData.name.length > 3 &&
    this.formData.surname.length > 3 &&
    this.formData.birthdate && 
    this.formData.pIva.length >= 11 && 
    this.formData.pIva.length <= 13 &&
    this.formData.companyName.length > 3 &&
    this.formData.companyAddress.length > 3 &&
    this.formData.pec.length > 3 &&
    this.uploadedFiles.length === 2 &&
    this.formData.consentClauses
    return valid; 
  }
}
