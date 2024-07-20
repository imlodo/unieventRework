import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { ModerateTicketsComponent } from '../moderate-tickets/moderate-tickets.component';
import { ModerateArtistComponent } from '../moderate-artist/moderate-artist.component';

@Component({
  selector: 'unievent-moderate-panel',
  templateUrl: './moderate-panel.component.html',
  styleUrls: ['./moderate-panel.component.scss']
})
export class ModeratePanelComponent {
  selectedSection: string = "FrequentlyAnswers";
  @ViewChild('tickets', { static: false }) tickets: ModerateTicketsComponent;
  @ViewChild('artist', { static: false }) artist: ModerateArtistComponent;

  constructor(private cdr: ChangeDetectorRef,private globalService: GlobalService, private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.selectedSection = "Support"
    this.cdr.detectChanges();
  }

  changeSection(section: string) {
    this.selectedSection = section;
  }

}
