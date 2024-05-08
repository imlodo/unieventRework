import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { USER_TYPE } from 'src/app/core/utility/global-constant';
import { FileUploadService } from '../../services/file-upload-service/file-upload-service';

@Component({
  selector: 'unievent-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent {
  step:number = 1;
  selectedContentType:"Event"|"Topic";
  selectedFile: File | null = null;
  userType: USER_TYPE = USER_TYPE.ARTIST;
  isDraggedOver: boolean = false;
  uploadProgress: number | null = null;
  previewUrl: any = null;

  constructor(private fileUploadService: FileUploadService){
    this.step = this.userType === USER_TYPE.ARTIST ? 1 : 2;
    switch(this.userType){
      case USER_TYPE.CREATOR:
        this.selectedContentType = "Topic";
        break;
      default:
        this.selectedContentType = "Event";
        break;
    }
  }

  incrementStep(){
    this.step+=1;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.incrementStep();
    setTimeout(()=>{
      this.uploadFile();
      this.generatePreview();
    },1)
  }

  onFileDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
    const file: File = event.dataTransfer.files[0];
    this.selectedFile = file;
    this.incrementStep();
    setTimeout(()=>{
      this.uploadFile();
      this.generatePreview();
    },1)
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

  generatePreview() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      if (this.selectedFile.type.startsWith('video')) {
        reader.readAsDataURL(this.selectedFile);
      } else {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

}
