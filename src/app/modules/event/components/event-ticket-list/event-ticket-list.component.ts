import { Component, ChangeDetectorRef,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { pluck } from 'rxjs';

@Component({
  selector: 'unievent-event-ticket-list',
  templateUrl: './event-ticket-list.component.html',
  styleUrls: ['./event-ticket-list.component.scss']
})
export class EventTicketListComponent implements AfterViewInit {
  n_id: number;
  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
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
          this.n_id = decode.n_id;
        }
      }
      );
  }

  
}
