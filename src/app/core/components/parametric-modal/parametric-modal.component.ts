import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getTicketNameByType } from '../../utility/global-constant';
import { ObjectMap } from '../../models/objectMap';

@Component({
  selector: 'unievent-parametric-modal',
  templateUrl: './parametric-modal.component.html',
  styleUrls: ['./parametric-modal.component.scss']
})

export class ParametricModalComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  getTicketNameByType(type:Object){
    return getTicketNameByType(type);
  }

  getSeatList(object:ObjectMap){
    let seatsListString = "";
    object.t_seat_list.forEach(el=>{
      if(seatsListString.length > 0)
        seatsListString+=","
      seatsListString+=el.n_seat_num;
    })
    return seatsListString;
  }
}