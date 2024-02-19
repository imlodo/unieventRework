import { Component } from '@angular/core';

@Component({
  selector: 'unievent-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
