import { Component, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { pluck } from 'rxjs';
import { EventBestTicketFormComponent } from '../../forms/event-best-ticket-form/event-best-ticket-form.component';
import { ROUTE_LIST, allEventList, getTicketNameByType } from '../../../../core/utility/global-constant';
import { Event } from '../../../../core/models/event';
import { EventBestTicketFormModel } from '../../forms/event-best-ticket-form/event-best-ticket-form.model';
import { EventPlanSeatTicketFormComponent } from '../../forms/event-plan-seat-ticket-form/event-plan-seat-ticket-form.component';
import { EventBuyTicketRequest } from '../../models/eventBuyTicketRequest';
import { ObjectMap } from 'src/app/core/models/objectMap';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'unievent-event-ticket-list',
  templateUrl: './event-ticket-list.component.html',
  styleUrls: ['./event-ticket-list.component.scss']
})
export class EventTicketListComponent implements AfterViewInit {
  id: string;
  private eventData: Event;
  isBest: boolean = true;
  @ViewChild(EventBestTicketFormComponent, { static: false }) ebtc: EventBestTicketFormComponent;
  @ViewChild(EventPlanSeatTicketFormComponent, { static: false }) epstfc: EventPlanSeatTicketFormComponent;
  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private contentService: ContentService) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        if (decode.n_id) {
          this.id = decode.n_id;
          this.getEventById();
        }
      }
      );
  }

  getEventById() {
    this.contentService.getSingleContent(this.id).subscribe(
      (response: any) => {
        this.eventData = response;
        this.setFormPrice();
      },
      error => {
      }
    );
  }

  isObjectPricePresent(formRows: FormArray<FormGroup>, priceToCheck: number): boolean {
    return formRows.controls.some((formGroup: FormGroup) => {
      return formGroup.get('ticket_price')?.value === priceToCheck;
    });
  }

  setFormPrice() {
    if (this.ebtc) {
      this.ebtc.createForm();
      this.ebtc.eventTitle = this.eventData.t_caption;
      let seatType = [];
      this.eventData.t_map_list.forEach(t_maps => {
        t_maps.t_object_maps.forEach(el => {
          if (el.is_acquistabile) {
            if (!this.isObjectPricePresent(this.ebtc.formRows, el.n_object_price) && this.ebtc.formRows.controls.filter(form => form.get("ticket_title").value === getTicketNameByType(el.t_type) + " - " + t_maps.t_map_name)) {
              seatType[getTicketNameByType(el.t_type)] = true;
              let ebtfm: EventBestTicketFormModel = new EventBestTicketFormModel();
              ebtfm.n_id_ticket = el.n_id;
              ebtfm.n_ticket = 0;
              ebtfm.ticket_title = el.t_type ? getTicketNameByType(el.t_type) + " - " + t_maps.t_map_name : "Standard";
              ebtfm.ticket_price = el.n_object_price;
              ebtfm.ticket_map_id = t_maps.t_map_id;
              ebtfm.ticket_person_limit = el.n_limit_buy_for_person ? el.n_limit_buy_for_person : 5;
              let countDisponibiliTmp = el.t_seat_list.filter(seat => !seat.is_sell).length;
              ebtfm.ticket_is_available = countDisponibiliTmp > 0 ? true : false;
              ebtfm.ticket_avilable_seat = countDisponibiliTmp;
              this.ebtc.addFormToArray(ebtfm);
            }
            else {
              //Se entra qui significa che c'è già un oggetto mappa dello stesso tipo inserito
              //La logica del posto migliore è strutturata così: i posti più vicini all'evento (es. console dj) sono i migliori 
              //Qui controllo se per il tipo di oggetto è disponibile un posto in qualsiasi dei biglietti disponibili
              const formConst = this.ebtc.formRows.controls.filter(form => form.get("ticket_title").value === getTicketNameByType(el.t_type) + " - " + t_maps.t_map_name);
              //Se il ticket_is_available per quel tipo di oggetto è false  
              if (formConst && formConst.length > 0 && !formConst[0].get("ticket_is_available").value) {
                formConst[0].get("ticket_is_available").setValue(el.t_seat_list.filter(seat => !seat.is_sell).length > 0 ? true : false);
              }
              if (formConst && formConst.length > 0) {
                let countDisponibiliTmp = el.t_seat_list.filter(seat => !seat.is_sell).length;
                let availableSeatCount = formConst[0].get("ticket_avilable_seat").value;
                formConst[0].get("ticket_avilable_seat").setValue(availableSeatCount + countDisponibiliTmp);
              }
            }
          }

        });
      })

    }
  }

  showBest() {
    this.isBest = true;
    this.cdr.detectChanges();
    this.setFormPrice();
  }

  showPlan() {
    this.isBest = false;
    this.cdr.detectChanges();
    if (this.epstfc) {
      this.epstfc.mapList = this.eventData.t_map_list;
      this.epstfc.mapList?.forEach((el, index) => {
        this.epstfc.mapSelectItems.push({ id: index, name: el.t_map_name });
      })
      this.epstfc.createForm();
    }
  }

  buyTickets(eventBuyTicketRequestList: Array<EventBuyTicketRequest>) {
    eventBuyTicketRequestList.forEach(el => {
      el.n_event_id = this.id
    })
    this.getTicketListByBestTicketType(eventBuyTicketRequestList);
  }

  getTicketListByBestTicketType(eventBuyTicketRequestList: Array<EventBuyTicketRequest>) {
    let eventBuyTicketRequestListRefactor: Array<ObjectMap> = [];
    eventBuyTicketRequestList.forEach(el => {
      let foundedMap = [...this.eventData.t_map_list.filter(map => map.t_map_id === el.n_id_map)]
      let objectMapFiltered: ObjectMap[] = [...foundedMap[0].t_object_maps.filter(obj => obj.n_id === el.n_object_id)]

      if (objectMapFiltered) {
        //Controllo se non è venduto
        if (objectMapFiltered[0].t_seat_list.filter(sell => !sell.is_sell).length > 0) {
          eventBuyTicketRequestListRefactor.push(objectMapFiltered[0]);
          el.n_quantity -= 1;
        }

        let ticketType = getTicketNameByType(objectMapFiltered[0].t_type);
        this.eventData.t_map_list.forEach(map => {
          objectMapFiltered = map.t_object_maps.filter(obj => (obj.n_id !== el.n_object_id) && (getTicketNameByType(obj.t_type) === ticketType) && obj.t_seat_list.filter(seat => !seat.is_sell).length > 0).slice(0, el.n_quantity);
        });
        objectMapFiltered.forEach(object => eventBuyTicketRequestListRefactor.push(object));
      }
    });
    let eventDataCopy: Event = {
      id: this.eventData.id,
      n_group_id: this.eventData.n_group_id,
      n_click: this.eventData.n_click,
      t_title: this.eventData.t_caption,
      t_caption: this.eventData.t_caption,
      t_image_link: this.eventData.t_image_link,
      t_event_date: this.eventData.t_event_date,
      t_map_list: [],
      t_user: this.eventData.t_user,
      t_location: this.eventData.t_location,
      t_type: this.eventData.t_type,
      b_external_event: false,
      b_active: true
    }
    const params = this.globalService.encodeParams({
      eventTicketList: eventBuyTicketRequestListRefactor,
      eventData: eventDataCopy
    });
    this.router.navigate([ROUTE_LIST.payment.overview, params]);
  }

}
