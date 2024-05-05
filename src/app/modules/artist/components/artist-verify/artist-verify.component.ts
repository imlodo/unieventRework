import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ExtendedFile } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-artist-verify',
  templateUrl: './artist-verify.component.html',
  styleUrls: ['./artist-verify.component.scss']
})
export class ArtistVerifyComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFiles: Array<{ key: string, file: File }> = new Array();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer){

  }
  
  sendVerifyAccount() {
    return false;
  }

  handleFileInput(fileInput: HTMLInputElement, key: string) {
    const files = fileInput.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i) as ExtendedFile;
        if (file) {
          file.preview = this.createFilePreview(file);
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
}
