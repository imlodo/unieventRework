import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalService, UserService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';
import { SupportService } from 'src/app/core/services/supportService/support.service';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'unievent-moderate-artist',
  templateUrl: './moderate-artist.component.html',
  styleUrls: ['./moderate-artist.component.scss']
})
export class ModerateArtistComponent {
  ticketDescription: string = '';
  characterCount: number = 0;
  uploadedFiles: File[] = [];
  sort: MatSort;
  paginator: MatPaginator;
  artistData: MatTableDataSource<any>;
  displayedColumns: string[] = ['alias', 'status', 'actions'];
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) set matSort(ms: MatSort) { this.sort = ms; this.setDataSourceAttributes(); }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) { this.paginator = mp; this.setDataSourceAttributes();}

  constructor(private router: Router, private globalService: GlobalService, private cr: ChangeDetectorRef, private userService: UserService, private toastr: ToastrService) {

  }

  ngAfterViewInit(): void {
    this.cr.detectChanges();
  }


  ngOnInit(): void {
    this.userService.getVerifyAccountList().subscribe(
      (response: any) => {
        const data: any[] = response;
        this.artistData = new MatTableDataSource(data);
        this.artistData.sort = this.sort;
        this.artistData.paginator = this.paginator;
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nel recupero dei ticket di verifica artista');
      }
    );
  }

  setDataSourceAttributes() {
    if(this.artistData){
      this.artistData.paginator = this.paginator;
      this.artistData.sort = this.sort;
    }
  }

  showDetails(artistRequest: any): void {
    const params = this.globalService.encodeParams({
      artistRequest: artistRequest
    });
    this.router.navigate([ROUTE_LIST.artist.detail, params]);
  }

}
