import { Component } from '@angular/core';

@Component({
  selector: 'unievent-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent {
  step:number = 1;
  selectedContentType:"Event"|"Topic"="Event";

  incrementStep(){
    this.step+=1;
  }

  decrementStep(){
    this.step-=1;
  }

}
