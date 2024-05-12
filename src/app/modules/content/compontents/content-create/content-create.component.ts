import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MAP_TYPE, ROUTE_LIST, USER_TYPE } from 'src/app/core/utility/global-constant';
import { FileUploadService } from '../../services/file-upload-service/file-upload-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Map } from 'src/app/core/models/map';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'unievent-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent {
  step: number = 4;
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
  lastSavedTextAfterAt: string = null;
  eventListner: any;
  characterCount: number = 0;
  privacyContent: string = "all";
  currentSuggestPrefix = null;
  suggestArray: Array<String> = [
    "antoniolodato1",
    "mariobaldi",
    "bocconcino",
    "video pazzi"
  ]
  suggestArrayFiltered: Array<String> = [];
  tagArray: Array<String> = new Array();
  hashTagArray: Array<String> = new Array();
  mapArray: Array<{ t_map_id: number, t_map_name: string, t_map_object: Map }> = new Array();
  selectedMap: Map;
  mapTypeArray: string[] = Object.values(MAP_TYPE);
  selectedMapType: string;
  showAddMap: boolean = false;
  formMap = new FormGroup({
    mapName: new FormControl(''),
    mapType: new FormControl(''),
    numRows: new FormControl(''),
    numColumns: new FormControl('')
  });
  numRows: number;
  numColumns: number;
  currentSelectedMap: Map;
  currentMapIndex = 1;

  constructor(private fileUploadService: FileUploadService, private toastr: ToastrService, private router: Router) {
    //this.step = this.userType === USER_TYPE.ARTIST ? 1 : 2;
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
        this.getVideoPreview();
      } else {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  getVideoPreview() {
    this.previewUrl = "/assets/img/topic-image-placeholder.jpg";
    this.coverUrl = "/assets/img/topic-image-placeholder.jpg";
  }

  addHashtag() {
    this.insertTextToTextarea('#');
    this.eventListner = this.handleAfterAtKeypress.bind(this);
    this.savedTextAfterAt += "#";
    this.currentSuggestPrefix = "#";
    this.descriptionTextarea.nativeElement.addEventListener('keydown', this.eventListner);
  }

  addTag() {
    this.insertTextToTextarea('@');
    this.eventListner = this.handleAfterAtKeypress.bind(this);
    this.savedTextAfterAt += "@";
    this.currentSuggestPrefix = "@";
    this.descriptionTextarea.nativeElement.addEventListener('keydown', this.eventListner);
  }

  insertTextToTextarea(text: string) {
    const textarea = this.descriptionTextarea.nativeElement;
    textarea.value = textarea.value + " " + text
    textarea.focus();
    this.updateCharacterCount();
  }

  handleAfterAtKeypress(event: KeyboardEvent) {
    const char = event.key;
    if (char === ' ') {
      this.removeListner();
    }
    else if (char === "Backspace") {
      this.savedTextAfterAt = this.savedTextAfterAt.slice(0, this.savedTextAfterAt.length - 1);
      if (this.savedTextAfterAt.length == 0)
        this.removeListner();
    }
    else {
      this.savedTextAfterAt += char;
      this.filterSuggest();
    }
  }

  filterSuggest() {
    //Qui vanno presi dal backend
    if (this.savedTextAfterAt.includes("@")) {

    } else if (this.savedTextAfterAt.includes("#")) {

    }
    this.suggestArrayFiltered = this.suggestArray.filter(el => el.includes(this.savedTextAfterAt.replace("@", "").replace("#", "")));
  }

  removeListner() {
    this.descriptionTextarea.nativeElement.removeEventListener('keydown', this.eventListner);
    this.lastSavedTextAfterAt = this.savedTextAfterAt;
    this.savedTextAfterAt = "";
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

  addSuggestToTagArea(suggestWord: String) {
    setTimeout(() => {
      if (this.currentSuggestPrefix.includes("#")) {
        if (!this.hashTagArray.includes(suggestWord))
          this.hashTagArray.push(suggestWord);
      } else if (this.currentSuggestPrefix.includes("@")) {
        if (!this.tagArray.includes(suggestWord))
          this.tagArray.push(suggestWord);
      }
      this.descriptionTextarea.nativeElement.value = this.descriptionTextarea.nativeElement.value.replace(this.lastSavedTextAfterAt, "").trimStart();
      this.updateCharacterCount();
      this.suggestArrayFiltered = new Array();
    }, 100)
  }

  removeHashTagElement(hashTag: String) {
    this.hashTagArray = this.hashTagArray.filter(el => el != hashTag);
  }

  removeTagElement(tag: String) {
    this.tagArray = this.tagArray.filter(el => el != tag);
  }

  isValidStep3() {
    return this.descriptionTextarea?.nativeElement.value.length > 3 && this.uploadProgress === 100;
  }

  isValidStep4() {
    return this.descriptionTextarea?.nativeElement.value.length > 3 && this.uploadProgress === 100;
  }

  clearAddMap(): void {
    this.showAddMap = false;
  }

  openAddMapPanel(): void {
    this.showAddMap = true;
  }

  addMap(form: any) {
    if (form.valid) {
      this.mapArray.push(
        {
          t_map_id: this.currentMapIndex,
          t_map_name: form.value.mapName,
          t_map_object: {
            t_map_id: this.currentMapIndex, //viene dato dal back-end
            t_map_event_id: 1, //è associato all'evento creato allo step precedente 
            t_map_name: form.value.mapName,
            t_map_total_seat: 0, //perchè non vengono aggiunti ancora elementi,
            t_object_maps: new Array(),
            t_map_type: MAP_TYPE[form.value.mapType],
            t_map_num_column: form.value.numColumns,
            t_map_num_rows: form.value.numRows
          }
        });

      this.mapArray = [...this.mapArray];
      form.reset();
      this.showAddMap = false;
      this.currentMapIndex += 1;
    }
  }

  onMapSelectionChanged(event: any) {
    this.currentSelectedMap = null;
    this.numColumns = null;
    this.numRows = null;
    this.selectedMapType = null;

    if (event) {
      this.numColumns = event.t_map_object.t_map_num_column;
      this.numRows = event.t_map_object.t_map_num_rows;
      this.selectedMapType = event.t_map_object.t_map_type;
      this.currentSelectedMap = event.t_map_object;
    }
  }

  deleteCurrentMap() {
    let copyArray = new Array();
    this.mapArray.forEach(el=>{
      if(el.t_map_id != this.currentSelectedMap.t_map_id){
        copyArray.push(el)
      } 
    })
    this.mapArray = copyArray;
    // Resetta le variabili dopo la rimozione
    this.currentSelectedMap = null;
    this.selectedMap = null;
    this.numColumns = null;
    this.numRows = null;
    this.selectedMapType = null;

  }
}
