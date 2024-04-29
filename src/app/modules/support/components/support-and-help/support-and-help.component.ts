import { Component } from '@angular/core';

@Component({
  selector: 'unievent-support-and-help',
  templateUrl: './support-and-help.component.html',
  styleUrls: ['./support-and-help.component.scss']
})
export class SupportAndHelpComponent {
  selectedSection: string = "FrequentlyAnswers";

  changeSection(section: string) {
    this.selectedSection = section;
  }
}
