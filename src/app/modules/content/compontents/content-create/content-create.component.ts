import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MAP_TYPE, OBJECT_MAP_TYPE_STRING, ROUTE_LIST, USER_TYPE, getTicketNameByType, suggestArray } from 'src/app/core/utility/global-constant';
import { FileUploadService } from '../../services/file-upload-service/file-upload-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Map } from 'src/app/core/models/map';
import { FormControl, FormGroup } from '@angular/forms';
import { ObjectMap } from 'src/app/core/models/objectMap';
import { randomIntFromInterval } from 'src/app/core/utility/functions-constants';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/core/models/user';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { CookieService } from 'ngx-cookie-service';
import moment from 'moment';

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
  fileUrl: string | null = null;
  maxTextAreaCharacter: number = 200;
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef<HTMLTextAreaElement>;
  descriptionValue: string = null;
  savedTextAfterAt: string = '';
  lastSavedTextAfterAt: string = null;
  eventListner: any;
  characterCount: number = 0;
  privacyContent: string = "all";
  currentSuggestPrefix = null;
  suggestArray: Array<String> = suggestArray;
  suggestUserArrayFiltered: Array<User> = [];
  suggestArrayFiltered: Array<String> = [];
  tagArray: Array<String> = new Array();
  hashTagArray: Array<String> = new Array();
  mapArray: Array<{ t_map_id: number, t_map_name: string, t_map_object: Map }> = new Array();
  selectedMap: Map;
  mapTypeArray: string[] = Object.values(MAP_TYPE);
  objectTypeArray: string[] = Object.values(OBJECT_MAP_TYPE_STRING);
  selectedMapType: string;
  showAddMap: boolean = false;
  showAddElement: boolean = false;
  showEditElement: boolean = false;
  formMap = new FormGroup({
    mapName: new FormControl(''),
    mapType: new FormControl(''),
    numRows: new FormControl(''),
    numColumns: new FormControl('')
  });
  formAddElementToMap = new FormGroup({
    elementType: new FormControl(null),
    price: new FormControl(null),
    xPos: new FormControl(null),
    yPos: new FormControl(null),
    n_min_num_person: new FormControl(null),
    n_max_num_person: new FormControl(null),
    n_obj_map_fill: new FormControl(null),
    n_obj_map_text: new FormControl(null),
    t_note: new FormControl(null),
    is_acquistabile: new FormControl(null)
  });
  formEditElementToMap = new FormGroup({
    elementType: new FormControl(null),
    price: new FormControl(null),
    xPos: new FormControl(null),
    yPos: new FormControl(null),
    n_min_num_person: new FormControl(null),
    n_max_num_person: new FormControl(null),
    n_obj_map_fill: new FormControl(null),
    n_obj_map_text: new FormControl(null),
    t_note: new FormControl(null),
    is_acquistabile: new FormControl(null)
  });
  numRows: number;
  numColumns: number;
  currentSelectedMap: Map;
  currentMapIndex = 1;
  group_event_id: number = null;
  t_event_date: any = null;
  seatMapList: ObjectMap[][] = [];
  currentSelectEditElementIndex: { i: number, j: number };
  currentUser: User = null;
  fileType: "video" | "img" = "img";
  locationData: any = {
    t_address: "",
    t_cap: "",
    t_city: "",
    t_location_name: "",
    t_province: "",
    t_state: "",
  };
  minExpiryDate: Date;
  filteredRelatedEvents: Array<any> = [];
  relatedEvent: any = null;

  constructor(private fileUploadService: FileUploadService, private cookieService: CookieService, private toastr: ToastrService, private router: Router, private userService: UserService, private contentService: ContentService) {
    this.minExpiryDate = moment().add(1, 'day').toDate();
    this.currentUser = JSON.parse(this.cookieService.get("current_user")) as User;
    this.userType = USER_TYPE[this.currentUser.t_type];
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

  updateEventDate(date: Date) {
    this.t_event_date = date.toDateString();
  }

  incrementStep() {
    if (this.descriptionTextarea && this.descriptionTextarea.nativeElement) {
      this.descriptionValue = this.descriptionTextarea.nativeElement.value;
    }
    this.step += 1;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.incrementStep();
    setTimeout(() => {
      this.uploadFileAzure();
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
      this.uploadFileAzure();
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

  uploadFileAzure(): void {
    if (this.selectedFile) {
      this.uploadProgress = 0;
      if(this.selectedFile.type.includes("video")){
        this.fileUploadService.uploadFileVideoAzure(this.selectedFile).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploadProgress = 100;
            console.log('File successfully uploaded!', event.body);
            this.fileUrl = event.body.original_url;
            this.coverUrl = event.body.preview_url;
            this.previewUrl = event.body.preview_url;
          }
        }, error => {
          console.error('Error uploading file', error);
        });
      } else{
        this.fileUploadService.uploadFileAzure(this.selectedFile).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploadProgress = 100;
            console.log('File successfully uploaded!', event.body);
            this.fileUrl = event.body.url
          }
        }, error => {
          console.error('Error uploading file', error);
        });
      }
    } else {
      console.error('No file selected');
    }
  }

  deleteFileAzure(): void{
    if (this.fileUrl) {
      this.uploadProgress = 0;
      if(this.selectedFile.type.includes("video")){
        this.fileUploadService.deleteFileAzure(this.fileUrl).subscribe(event => {
        }, error => {
          console.error('Error deleting file', error);
        });
        this.fileUploadService.deleteFileAzure(this.previewUrl).subscribe(event => {
          window.location.reload();
        }, error => {
          window.location.reload();
          console.error('Error deleting file', error);
        });
      } else {
        this.fileUploadService.deleteFileAzure(this.previewUrl).subscribe(event => {
          window.location.reload();
        }, error => {
          window.location.reload();
          console.error('Error deleting file', error);
        });
      }
    } else {
      window.location.reload();
      console.error('No file selected');
    }
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  searchEvent(term: string, items: any[]) {
    this.contentService.getEventByName(term).subscribe(
      (response) => {
        this.filteredRelatedEvents = response.events;
        items = response.events;
      },
      error => console.error(error)
    );
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
        this.fileType = "video";
      } else {
        reader.readAsDataURL(this.selectedFile);
      }
    }
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
    console.log(char);
    if (char === ' ') {
      this.removeListner();
    }
    else if (char === "Backspace") {
      this.savedTextAfterAt = this.savedTextAfterAt.slice(0, this.savedTextAfterAt.length - 1);
      if (this.savedTextAfterAt.length == 0)
        this.removeListner();
    }
    else if (char === "Enter") {
      if (this.savedTextAfterAt.includes("#")) {
        this.lastSavedTextAfterAt = this.savedTextAfterAt;
        this.addSuggestToTagArea(this.savedTextAfterAt.replace("#", ""));
      }
    }
    else {
      this.savedTextAfterAt += char;
      this.filterSuggest();
    }
  }

  filterSuggest() {
    if (this.savedTextAfterAt.includes("@")) {
      this.userService.searchUser(this.savedTextAfterAt.replace("@", "")).subscribe(
        response => {
          this.suggestUserArrayFiltered = response.users;
        },
        error => {
          // this.toastr.error(error.error);
        }
      );
    } else if (this.savedTextAfterAt.includes("#")) {
      this.suggestArrayFiltered = this.suggestArray.filter(el => el.includes(this.savedTextAfterAt.replace("@", "").replace("#", "")));
    }
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
    if(this.fileUrl){
      this.deleteFileAzure();
    } else {
      window.location.reload();
    }
  }

  publicContent() {
    if (this.selectedContentType === "Event") {
      this.contentService.addContent("Eventi", this.descriptionValue, this.privacyContent, this.currentUser.t_alias_generated, this.coverUrl, this.fileType.includes("video") ? this.fileUrl : null, this.tagArray, this.hashTagArray, this.t_event_date, this.relatedEvent ? this.relatedEvent.id : null, this.group_event_id, this.locationData, this.mapArray).subscribe(
        response => {
          this.toastr.success(null, "Contenuto pubblicato con successo", { progressBar: true });
          this.router.navigate([ROUTE_LIST.content.manage]);
        },
        error => {
          this.toastr.error(error.error);
        }
      );

    } else {
      this.contentService.addContent("Topics", this.descriptionTextarea.nativeElement.value, this.privacyContent, this.currentUser.t_alias_generated, this.coverUrl, this.fileType === "video" ? this.fileUrl : null, this.tagArray, this.hashTagArray, null, null, null, null, null).subscribe(
        response => {
          this.toastr.success(null, "Contenuto pubblicato con successo", { progressBar: true });
          this.router.navigate([ROUTE_LIST.content.manage]);
        },
        error => {
          this.toastr.error(error.error);
        }
      );
    }
  }

  changeEvent(event:any){
    this.group_event_id = event.n_group_id;
    this.relatedEvent = event;
  }

  addSuggestToTagArea(suggestWord: String) {
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
    this.suggestUserArrayFiltered = new Array();
  }

  removeHashTagElement(hashTag: String) {
    this.hashTagArray = this.hashTagArray.filter(el => el != hashTag);
  }

  removeTagElement(tag: String) {
    this.tagArray = this.tagArray.filter(el => el != tag);
  }

  isValidStep3() {

    return this.descriptionTextarea?.nativeElement.value.length > 3 && this.uploadProgress === 100 && this.t_event_date && this.t_event_date.length > 0 && this.locationData.t_address.length > 0 &&
      this.locationData.t_city.length > 0 && this.locationData.t_cap > 9999 && this.locationData.t_cap <= 99999 && this.locationData.t_province.length > 0 &&
      this.locationData.t_state.length > 0 && this.locationData.t_location_name.length > 0;
  }

  isValidTopicStep3(){
    return this.descriptionTextarea?.nativeElement.value.length > 3 && this.uploadProgress === 100;
  }

  isValidStep4() {
    return this.mapArray.length && this.mapArray[0].t_map_object.t_object_maps.length === (this.mapArray[0].t_map_object.t_map_num_column * this.mapArray[0].t_map_object.t_map_num_rows);
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
            t_map_total_seat: form.value.numColumns * form.value.numRows,
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
      this.createSeatMapByMapList();
    }
  }

  deleteCurrentMap() {
    let copyArray = new Array();
    this.mapArray.forEach(el => {
      if (el.t_map_id != this.currentSelectedMap.t_map_id) {
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

  createSeatMapByMapList() {
    let row = Array(this.currentSelectedMap.t_map_num_rows).fill(0).map((x, i) => i);
    let column = Array(this.currentSelectedMap.t_map_num_column).fill(0).map((x, i) => i);
    let seatMap: ObjectMap[][] | any[][] = [];
    row.forEach(rowIndex => {
      seatMap[rowIndex] = [];
      column.forEach(columnIndex => {
        seatMap[rowIndex][columnIndex] = {};
      });
    })
    this.currentSelectedMap.t_object_maps.forEach(object => {
      if (!seatMap[object.n_obj_map_cord_x][object.n_obj_map_cord_y].n_id)
        seatMap[object.n_obj_map_cord_x][object.n_obj_map_cord_y] = { ...object };
    });
    this.seatMapList = seatMap;
  }

  getNumOfRowAndColByTotalSeat(maxSeat: number) {
    let num = 1;
    while (true) {
      if ((num * num) >= maxSeat)
        return num;
      num += 1;
    }
  }

  showTicketDetail(object: ObjectMap, i: number, j: number): void {
    this.currentSelectEditElementIndex = { i, j };
    this.formEditElementToMap.patchValue({
      elementType: typeof object.t_type === 'string' ? object.t_type : getTicketNameByType(object.t_type),
      price: object.n_object_price,
      xPos: object.n_obj_map_cord_x,
      yPos: object.n_obj_map_cord_y,
      n_min_num_person: object.n_min_num_person,
      n_max_num_person: object.n_max_num_person,
      n_obj_map_fill: object.n_obj_map_fill ?? '#00000000',
      n_obj_map_text: object.n_obj_map_text,
      t_note: object.t_note,
      is_acquistabile: object.is_acquistabile
    });

    this.showEditElement = true;
  }

  openAddElementToCurrentMapPanel() {
    let totalSeats = 0;
    this.seatMapList.forEach(el => {
      totalSeats += el.length;
    })
    if ((totalSeats < (this.currentSelectedMap.t_map_num_rows * this.currentSelectedMap.t_map_num_column)) || this.currentSelectedMap.t_object_maps.length < totalSeats)
      this.showAddElement = true;
    else {
      this.toastr.warning(null, "Non puoi aggiungere elementi, la mappa è piena, modifica gli elementi presenti oppure aumenta il numero di righe (e/o colonne).", { progressBar: true });
    }
  }

  closeAddElementToCurrentMapPanel() {
    this.showAddElement = false;
  }

  addElementToCurrentMap(form: any) {
    if (
      (this.currentSelectedMap.t_map_num_column < (form.value.yPos + 1)) ||
      (this.currentSelectedMap.t_map_num_rows < (form.value.xPos + 1)) ||
      this.seatMapList[form.value.xPos][form.value.yPos].n_id
    ) {
      this.toastr.warning("Non è possibile inserire l'elemento nella posizione richiesta, è inesistente oppure già occupata");
    }
    else {
      if (this.checkIsValidEditOrInsert(form.value.elementType)) {
        let value = {
          n_id: randomIntFromInterval(1, 10000),
          n_id_map: this.currentSelectedMap.t_map_id,
          n_min_num_person: form.value.n_min_num_person,
          n_max_num_person: form.value.n_max_num_person,
          //MANCA n_limit_buy_for_person?: number;
          n_object_price: form.value.price,
          //QUESTO LO DEVE AGGIUNGERE IL SITO IN BASE AD UNA CONFIGURAZIONE t_object_commissions?: { commission_price: number, commission_type: string };
          n_obj_map_cord_x: form.value.xPos,
          n_obj_map_cord_y: form.value.yPos,
          n_obj_map_cord_z: 1,
          n_obj_map_width: form.value.elementType === "CONSOLE" ? 200 : 120,
          n_obj_map_height: form.value.elementType === "CONSOLE" ? 100 : 50,
          n_obj_map_fill: form.value.elementType === "CONSOLE" ? "#7c7c7c" : form.value.n_obj_map_fill,
          n_obj_map_text: form.value.elementType === "CONSOLE" ? "CONSOLE" : form.value.n_obj_map_text,
          t_note: form.value.t_note,
          t_type: form.value.elementType,
          t_seat_list: form.value.elementType === "CONSOLE" ? [] : [{
            n_seat_num: form.value.xPos + form.value.yPos, // Da capire in base alla posizione
            n_object_map_id: this.currentSelectedMap.t_map_id,
            n_id_event: 1, //Da prendere dal back-end
            is_sell: false,
            is_acquistabile: form.value.is_acquistabile
          }], //Da cambiare in base al tipo di elemento
          is_acquistabile: form.value.elementType === "CONSOLE" ? false : form.value.is_acquistabile
        }
        this.currentSelectedMap.t_object_maps.push({ ...value });
        this.createSeatMapByMapList();
        this.showAddElement = false;
      }
    }
  }

  checkIsValidEditOrInsert(elementType: string) {
    if (this.currentSelectedMap.t_object_maps.filter(element => (element.t_type as any) === "CONSOLE").length > 0 && elementType === "CONSOLE") {
      this.toastr.warning("Non è possibile inserire l'elemento, esiste già una console");
      return false;
    }
    return true;
  }

  editElementToCurrentMap(form: any) {
    if (this.checkIsValidEditOrInsert(form.value.elementType)) {
      let editObj = this.seatMapList[this.currentSelectEditElementIndex.i][this.currentSelectEditElementIndex.j];
      this.seatMapList
      let patchObjectMapValue = {
        n_id: editObj.n_id,
        n_id_map: editObj.n_id_map,
        n_min_num_person: form.value.n_min_num_person ? form.value.n_min_num_person : editObj.n_min_num_person,
        n_max_num_person: form.value.n_max_num_person ? form.value.n_max_num_person : editObj.n_max_num_person,
        //MANCA n_limit_buy_for_person?: number;
        n_object_price: form.value.price ? form.value.price : editObj.n_object_price,
        //QUESTO LO DEVE AGGIUNGERE IL SITO IN BASE AD UNA CONFIGURAZIONE t_object_commissions?: { commission_price: number, commission_type: string };
        n_obj_map_cord_x: editObj.n_obj_map_cord_x,
        n_obj_map_cord_y: editObj.n_obj_map_cord_y,
        n_obj_map_cord_z: editObj.n_obj_map_cord_z,
        n_obj_map_width: form.value.elementType === "CONSOLE" ? 200 : editObj.n_obj_map_width,
        n_obj_map_height: form.value.elementType === "CONSOLE" ? 100 : editObj.n_obj_map_height,
        n_obj_map_fill: form.value.elementType === "CONSOLE" ? "#7c7c7c" : form.value.n_obj_map_fill,
        n_obj_map_text: form.value.elementType === "CONSOLE" ? "CONSOLE" : form.value.n_obj_map_text,
        t_note: form.value.t_note,
        t_type: form.value.elementType ? form.value.elementType : editObj.t_type,
        t_seat_list: form.value.elementType === "CONSOLE" ? [] : editObj.t_seat_list, //Da cambiare in base al tipo di elemento (qui aggiungere che se è console tutti i posti devono essere non acquistabili)
        is_acquistabile: form.value.elementType === "CONSOLE" ? false : form.value.is_acquistabile
      }
      this.currentSelectedMap.t_object_maps[this.currentSelectEditElementIndex.i + this.currentSelectEditElementIndex.j] = { ...patchObjectMapValue };
      this.seatMapList[this.currentSelectEditElementIndex.i][this.currentSelectEditElementIndex.j] = { ...patchObjectMapValue };
      this.showEditElement = false;
    }
  }

  checkNumMinMaxPerson(index: number, form: any) {
    if (form.value.n_min_num_person && form.value.n_max_num_person && (form.value.n_min_num_person > form.value.n_max_num_person)) {
      index === 1 ?
        this.formAddElementToMap.patchValue({
          elementType: form.value.elementType,
          price: form.value.price,
          xPos: form.value.xPos,
          yPos: form.value.yPos,
          n_min_num_person: null,
          n_max_num_person: form.value.n_max_num_person,
          n_obj_map_fill: form.value.n_obj_map_fill ?? '#00000000',
          n_obj_map_text: form.value.n_obj_map_text,
          t_note: form.value.t_note,
          is_acquistabile: form.value.is_acquistabile
        }) : this.formEditElementToMap.patchValue({
          elementType: form.value.elementType,
          price: form.value.price,
          xPos: form.value.xPos,
          yPos: form.value.yPos,
          n_min_num_person: null,
          n_max_num_person: form.value.n_max_num_person,
          n_obj_map_fill: form.value.n_obj_map_fill ?? '#00000000',
          n_obj_map_text: form.value.n_obj_map_text,
          t_note: form.value.t_note,
          is_acquistabile: form.value.is_acquistabile
        });
    }
  }

  deleteElement(form: any) {
    let newObjectMapArray = new Array();
    this.currentSelectedMap.t_object_maps.forEach(el => {
      if (el.n_obj_map_cord_x === form.value.xPos && el.n_obj_map_cord_y === form.value.yPos)
        null;
      else
        newObjectMapArray.push({ ...el })
    });
    setTimeout(() => {
      this.currentSelectedMap.t_object_maps = [...newObjectMapArray]
      this.createSeatMapByMapList();
    }, 1)
    this.showEditElement = false;
  }

  automaticFillSeat() {
    let count = 0;
    for (let i = 0; i < this.currentSelectedMap.t_map_num_rows; i++) {
      for (let j = 0; j < this.currentSelectedMap.t_map_num_column; j++) {
        count++;
        let objectMapTmp: ObjectMap = {
          n_id: count,
          n_id_map: this.currentSelectedMap.t_map_id,
          n_min_num_person: 1,
          n_max_num_person: 1,
          n_limit_buy_for_person: 1,
          n_object_price: randomIntFromInterval(1, 100),
          n_obj_map_cord_x: i,
          n_obj_map_cord_y: j,
          n_obj_map_cord_z: 1,
          n_obj_map_width: 120,
          n_obj_map_height: 50,
          n_obj_map_text: String(count),
          t_type: randomIntFromInterval(0, 1) ?
            { SEAT: { TYPE: { WITH_CONSUMATION: true } } } :
            { SEAT: { TYPE: { NO_CONSUMATION: true } } },
          t_seat_list: [{
            n_seat_num: count,
            n_object_map_id: count,
            n_id_event: 1,
            is_sell: false,
            is_acquistabile: true
          }],
          is_acquistabile: true
        }
        this.currentSelectedMap.t_object_maps[count - 1] = !this.seatMapList[i][j].n_id ? { ...objectMapTmp } : { ...this.seatMapList[i][j] };
      }
    }
    this.createSeatMapByMapList();
  }

  closeEditElement() {
    this.showEditElement = false;
  }

  resizeMap(tipo: number) {
    if (this.numRows && this.numColumns) {
      let mapIndex = 0;
      this.mapArray.filter((el, i) => {
        mapIndex = i;
        return el.t_map_id === this.currentSelectedMap.t_map_id;
      })
      if (tipo === 1) {
        this.mapArray[mapIndex].t_map_object.t_map_num_rows = this.numRows;
      } else {
        this.mapArray[mapIndex].t_map_object.t_map_num_column = this.numColumns;
      }
      this.mapArray[mapIndex].t_map_object.t_map_total_seat = this.mapArray[mapIndex].t_map_object.t_map_num_rows * this.mapArray[mapIndex].t_map_object.t_map_num_column;
      this.mapArray[mapIndex].t_map_object.t_object_maps = [];
      this.onMapSelectionChanged(this.mapArray[mapIndex])
    }
  }

  changeMapType() {
    this.currentSelectedMap.t_map_type = MAP_TYPE[this.selectedMapType];
  }
}
