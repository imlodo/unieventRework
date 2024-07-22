import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import moment from 'moment';
import { GlobalService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';
import { SupportService } from 'src/app/core/services/supportService/support.service';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'unievent-moderate-tickets',
  templateUrl: './moderate-tickets.component.html',
  styleUrls: ['./moderate-tickets.component.scss']
})
export class ModerateTicketsComponent {
  ticketDescription: string = '';
  characterCount: number = 0;
  uploadedFiles: File[] = [];
  sort: MatSort;
  paginator: MatPaginator;
  ticketData: MatTableDataSource<any>;
  displayedColumns: string[] = ['description', 'status', 'actions'];
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) set matSort(ms: MatSort) { this.sort = ms; this.setDataSourceAttributes(); }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; this.setDataSourceAttributes();}

  constructor(private router: Router, private globalService: GlobalService, private cr: ChangeDetectorRef, private supportService: SupportService, private toastr: ToastrService) {

  }

  ngAfterViewInit(): void {
    this.cr.detectChanges();
  }


  ngOnInit(): void {
    this.supportService.getSupportTicketList().subscribe(
      (response: any) => {
        const data: any[] = response;
        this.ticketData = new MatTableDataSource(data);
        this.ticketData.sort = this.sort;
        this.ticketData.paginator = this.paginator;
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nel recupero dei ticket di supporto');
      }
    );
  }

  /* Ticket List */

  setDataSourceAttributes() {
    if(this.ticketData){
      this.ticketData.paginator = this.paginator;
      this.ticketData.sort = this.sort;
    }
  }

  showDetails(ticket: Ticket): void {
    const params = this.globalService.encodeParams({
      ticket: ticket
    });
    this.router.navigate([ROUTE_LIST.supports.detail, params]);
  }

  truncateDescription(description: string): string {
    const maxLength = 80;
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    } else {
      return description;
    }
  }
}
