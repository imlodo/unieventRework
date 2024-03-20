import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EventPlanSeatTicketFormModel } from './event-plan-seat-ticket-form.model';
import { ObjectMap } from 'src/app/core/models/objectMap';
import { Map } from 'src/app/core/models/map';

@Component({
  selector: 'unievent-event-plan-seat-ticket-form',
  templateUrl: './event-plan-seat-ticket-form.component.html',
  styleUrls: ['./event-plan-seat-ticket-form.component.scss']
})
export class EventPlanSeatTicketFormComponent implements AfterViewInit {

  //Vedere questo articolo per implementare la selezione dei post tramite svg
  //https://medium.com/codex/draw-a-seating-chart-using-svg-shapes-and-angular-7092a52f4176
  //qui un esempio di implementazione: https://stackblitz.com/edit/ang-seatmap-svg-hrarcz?file=src%2Fapp%2Fseatmap%2Fseatmap.component.ts
  //@ViewChild('eventMap') canvas: ElementRef;

  form: FormGroup;
  selectedMapIndex: number = 0;
  eventTitle: string;
  mapList: Array<Map>;
  mapSelectItems: Array<{id:number, name:string}> = new Array();
  map_rows: number;
  map_columns: number;
  ctx: CanvasRenderingContext2D;
  mapSeatList: Array<ObjectMap[][]> = [];

  constructor(private formBuilder: RxFormBuilder, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  createForm() {
    this.addFormToArray(new EventPlanSeatTicketFormModel());
    this.createSeatMapByMapList();
  }

  addFormToArray(epstfm: EventPlanSeatTicketFormModel) {
    this.form = this.formBuilder.formGroup(epstfm);
  }

  get t_map_total_seat() {
    return this.form.get("t_map_total_seat").value;
  }
  get t_map_type() {
    return this.form.get("t_map_type").value;
  }

  set t_map_total_seat(t_map_total_seat: number) {
    this.form.get("t_map_total_seat").setValue(t_map_total_seat);
  }
  set t_map_type(t_map_type: number) {
    this.form.get("t_map_type").setValue(t_map_type);
  }

  isValid(): boolean {
    return this.form.status === "INVALID" ? false : true;
  }

  createSeatMapByMapList() {
    this.mapList.forEach(el => {
      let row = Array(this.getNumOfRowAndColByTotalSeat(el.t_map_total_seat)).fill(0).map((x, i) => i);
      let column = row;
      let seatMap: ObjectMap[][] | any[][] = [];
      row.forEach(rowIndex=>{
        seatMap[rowIndex] = [];
        column.forEach(columnIndex =>{
          seatMap[rowIndex][columnIndex] = [];
        });
      })
      el.t_object_maps.forEach(object =>{
        if(seatMap[object.n_obj_map_cord_y] && seatMap[object.n_obj_map_cord_y][object.n_obj_map_cord_x])
          seatMap[object.n_obj_map_cord_y][object.n_obj_map_cord_x] = object;
      });
      this.mapSeatList.push(seatMap);  
    });
  }

  /* ES DI SEAT DRAWING WITH CANVAS 
  drawEventMap() {
    this.ctx = this.canvas?.nativeElement.getContext("2d");
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas?.nativeElement.width, this.canvas?.nativeElement.height)
      if (this.mapList) {
        this.mapList[0].t_object_maps.forEach(el => {
          this.drawMapObject(el);
        });
      }
    }
  }

  drawMapObject(mapObject: ObjectMap) {
    let objectMapDraw = this.makeObjectMapForDraw(mapObject);
    objectMapDraw.x = objectMapDraw.x;
    objectMapDraw.y = objectMapDraw.y;
    this.ctx.beginPath();
    this.ctx.rect(objectMapDraw.x, objectMapDraw.y, objectMapDraw.width, objectMapDraw.height);
    this.ctx.closePath();
    this.ctx.textAlign="center"; 
    this.ctx.textBaseline = "middle";
    this.ctx.font="20px Georgia";
    this.ctx.textAlign="center"; 
    this.ctx.textBaseline = "middle";
    if (mapObject.n_obj_map_fill) {
      this.ctx.fillStyle = mapObject.n_obj_map_fill;
      this.ctx.fill();
      this.ctx.stroke();
    }
    
    if(mapObject.n_obj_map_text) {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillText(mapObject.n_obj_map_text,objectMapDraw.x+(objectMapDraw.width/2),objectMapDraw.y+(objectMapDraw.height/2)); 
      
    }
  }

  makeObjectMapForDraw(mapObject: ObjectMap) {
    let objectMapDraw = {
      x: mapObject.n_obj_map_cord_x,
      y: mapObject.n_obj_map_cord_y,
      width: mapObject.n_obj_map_width,
      height: mapObject.n_obj_map_height,
      right: mapObject.n_obj_map_cord_x + mapObject.n_obj_map_width,
      bottom: mapObject.n_obj_map_cord_y + mapObject.n_obj_map_height,
      fill: mapObject.n_obj_map_fill
    }

    return objectMapDraw;
  }*/

  getNumOfRowAndColByTotalSeat(maxSeat:number) {
    let num = 1;
    while (true) {
      if ((num * num) >= maxSeat)
        return num;
      num += 1;
    }
  }

}
