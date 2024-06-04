import moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';
import { GlobalService } from 'src/app/core/services';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'unievent-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ticketData: MatTableDataSource<any>;
  displayedColumns: string[] = ['numeroTicket', 'titolo', 'stato', 'dataCreazione', 'azioni'];
  showReviewsPanel: boolean = false;
  formReview = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    date: new FormControl(''),
    starsNum: new FormControl('')
  });
  constructor(private router: Router, private globalService: GlobalService) {

  }

  ngOnInit(): void {
    const data: any[] = [];
    for (let i = 1; i <= 50; i++) {
      data.push({
        numeroTicket: i,
        titolo: `Titolo ${i}`,
        stato: Math.random() < 0.5 ? 'Confermato ✅' : 'Annullato ❌',
        dataCreazione: this.randomDate(new Date(2022, 0, 1), new Date()),
        isScaduto: new Date(this.randomDate(new Date(2022, 0, 1), new Date())) < new Date()
      });
    }
    this.ticketData = new MatTableDataSource(data);
    this.ticketData.paginator = this.paginator;
    this.ticketData.sort = this.sort;
  }

  randomDate(start: Date, end: Date): string {
    return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString()).format("DD/MM/YYYY");
  }

  showDetails(ticket: any): void {
    const params = this.globalService.encodeParams({
      ticket: ticket
    });
    this.router.navigate([ROUTE_LIST.tickets, params]);
  }

  openReviewsPanel() {
    this.showReviewsPanel = true;
  }

  cancelAddReview(){
    this.showReviewsPanel = false;
  }

  addReview(form:any){

  }

}
