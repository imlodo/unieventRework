import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getTicketNameByType } from '../../utility/global-constant';

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
}