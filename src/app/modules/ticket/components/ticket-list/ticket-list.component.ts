import moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';
import { GlobalService } from 'src/app/core/services';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxStarsComponent } from 'src/app/core/components/ngx-stars/ngx-stars.component';
import { TicketService } from 'src/app/core/services/ticketService/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'unievent-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(NgxStarsComponent) starsComponent: NgxStarsComponent;
  ticketData: MatTableDataSource<any>;
  displayedColumns: string[] = ['numeroTicket', 'titolo', 'stato', 'dataCreazione', 'azioni'];
  showReviewsPanel: boolean = false;
  currentReviewTicketNumber: string = null;
  formReview = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    date: new FormControl(''),
  });
  isEditReview:boolean = false;

  constructor(private router: Router, private globalService: GlobalService, private ticketService: TicketService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.ticketService.getTicketList().subscribe(
      (response: any) => {
        const data: any[] = response;
        this.ticketData = new MatTableDataSource(data);
        this.ticketData.paginator = this.paginator;
        this.ticketData.sort = this.sort;
      },
      error => {
        this.toastr.error('Errore nel recupero dei biglietti');
      }
    );
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

  openReviewsPanel(ticket_number: string) {
    this.currentReviewTicketNumber = ticket_number;
    this.getTicketReviews(ticket_number);
  }

  cancelAddReview() {
    this.showReviewsPanel = false;
    this.formReview.reset();
  }

  getTicketReviews(ticket_number: string) {
    this.ticketService.getTicketReviews(ticket_number, true).subscribe(
      (response: any) => {
        this.formReview.patchValue({
          title: response.t_title,
          body: response.t_body,
          date: response.review_date,
        });
        setTimeout(() => {
          if (this.starsComponent)
            this.starsComponent.setRating(response.n_star);
        }, 1);
        this.showReviewsPanel = true;
        this.isEditReview = true;
      },
      error => {
        this.isEditReview = false;
        this.showReviewsPanel = true;
        this.formReview.reset();
      }
    );
  }

  addReview(form: any) {
    this.ticketService.addTicketReview(this.currentReviewTicketNumber, form.value.title, form.value.body, this.starsComponent.rating, form.value.date).subscribe(
      (response: any) => {
        console.log(response)
        this.toastr.success(response.message);
        this.showReviewsPanel = false;
        this.formReview.reset();
      },
      error => {
        this.toastr.error('Errore nell\'inserimento della recensione');
      }
    );
  }

  isValidForm(form: any) {
    return form.valid && this.starsComponent?.rating > 0;
  }

}
