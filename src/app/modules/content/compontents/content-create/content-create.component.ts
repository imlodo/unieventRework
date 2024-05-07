import { Component } from '@angular/core';

@Component({
  selector: 'unievent-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent {
  step:number = 1;
  selectedContentType:"Event"|"Topic"="Event";
  selectedFile: File | null = null;
  isArtist: boolean = true;
  isDraggedOver: boolean = false;

  constructor(){
    this.step = this.isArtist ? 1 : 2;
  }

  incrementStep(){
    this.step+=1;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.incrementStep();
  }

  onFileDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
    const file: File = event.dataTransfer.files[0];
    this.selectedFile = file;
    this.incrementStep();
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

}
