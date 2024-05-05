import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExtendedFile } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-artist-verify',
  templateUrl: './artist-verify.component.html',
  styleUrls: ['./artist-verify.component.scss']
})
export class ArtistVerifyComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFiles: Array<{ key: string, file: File }> = new Array();

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
}
