import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ROUTE_LIST, USER_TYPE } from 'src/app/core/utility/global-constant';
import { FileUploadService } from '../../services/file-upload-service/file-upload-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'unievent-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent {
  step: number = 1;
  selectedContentType: "Event" | "Topic";
  selectedFile: File | null = null;
  userType: USER_TYPE = USER_TYPE.ARTIST;
  isDraggedOver: boolean = false;
  uploadProgress: number | null = null;
  previewUrl: any = null;
  coverUrl: any = null;
  maxTextAreaCharacter: number = 200;
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef<HTMLTextAreaElement>;
  savedTextAfterAt: string = '';
  eventListner: any;
  characterCount: number = 0;
  privacyContent: string = "all"

  constructor(private fileUploadService: FileUploadService, private toastr: ToastrService, private router: Router) {
    this.step = this.userType === USER_TYPE.ARTIST ? 1 : 2;
    switch (this.userType) {
      case USER_TYPE.CREATOR:
        this.selectedContentType = "Topic";
        break;
      default:
        this.selectedContentType = "Event";
        break;
    }
  }

  incrementStep() {
    this.step += 1;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.incrementStep();
    setTimeout(() => {
      this.uploadFile();
      this.generatePreview();
    }, 1)
  }

  onFileDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
    const file: File = event.dataTransfer.files[0];
    this.selectedFile = file;
    this.incrementStep();
    setTimeout(() => {
      this.uploadFile();
      this.generatePreview();
    }, 1)
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
  }

  uploadFile() {
    console.log(this.selectedFile)
    if (this.selectedFile) {
      this.uploadProgress = 0;
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('File uploaded successfully', event.body);
          // Aggiungi qui la logica aggiuntiva dopo il caricamento del file
          this.incrementStep();
        } else if (event.type === 'progress') {
          this.uploadProgress = event.progress;
        } else if (event.type === 'response') {
          this.uploadProgress = 100;
          console.log('File uploaded successfully');
          // Aggiungi qui la logica aggiuntiva dopo il caricamento del file
          //this.incrementStep();
        }
      }, error => {
        console.error('Error uploading file', error);
        // Gestisci eventuali errori qui
      });
    } else {
      console.error('No file selected');
    }
  }

  onCoverFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.generateNewPreview(file);
  }

  generateNewPreview(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverUrl = e.target.result;
      };
      if (file.type.startsWith('video')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  }

  generatePreview() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.coverUrl = e.target.result;
      };
      if (this.selectedFile.type.startsWith('video')) {
        reader.readAsDataURL(this.selectedFile);
      } else {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  addHashtag() {
    this.insertTextToTextarea('#');
    this.eventListner = this.handleAfterAtKeypress.bind(this);
    this.descriptionTextarea.nativeElement.addEventListener('keypress', this.eventListner);
  }

  addTag() {
    this.insertTextToTextarea('@');
    this.eventListner = this.handleAfterAtKeypress.bind(this);
    this.descriptionTextarea.nativeElement.addEventListener('keypress', this.eventListner);
  }

  insertTextToTextarea(text: string) {
    const textarea = this.descriptionTextarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end, textarea.value.length);
    if (text === '#') {
      this.savedTextAfterAt = textAfter;
    } else if (text === '@') {
      this.savedTextAfterAt = textAfter;
    }
    textarea.value = textBefore + text;
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
  }

  handleAfterAtKeypress(event: KeyboardEvent) {
    const char = event.key;
    if (char === ' ') {
      this.removeListner();
      this.savedTextAfterAt = "";
    } else {
      this.savedTextAfterAt += char;
      console.log(this.savedTextAfterAt.replace("#", "").replace("@", ""))
    }
  }

  removeListner() {
    this.descriptionTextarea.nativeElement.removeEventListener('keypress', this.eventListner);
  }

  getCharacterCount() {
    return this.characterCount;
  }

  updateCharacterCount() {
    this.characterCount = this.descriptionTextarea?.nativeElement.value.length;
  }

  discard() {
    window.location.reload();
  }

  publicContent() {
    this.toastr.success(null, "Contenuto pubblicato con successo", { progressBar: true });
    this.router.navigate([ROUTE_LIST.content.manage]);
  }

}
