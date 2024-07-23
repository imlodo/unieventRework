import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs';
import { GlobalService, UserService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent {
  verifiyRequest: any = null;
  t_motivation: string = "";
  showRefuseModal: boolean = false;

  constructor(private globalService: GlobalService, private userService: UserService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.decodeParams();
  }

  ngOnInit(): void {
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        this.verifiyRequest = decode.artistRequest;
      });
  }

  get isRefused(): boolean {
    return this.verifiyRequest.status === 'refused';
  }

  get isRequested(): boolean {
    return this.verifiyRequest.status === 'requested';
  }

  get isVerified(): boolean {
    return this.verifiyRequest.status === 'verified';
  }

  openImage(fileUrl: string): void {
    const win = window.open();
    if (win) {
      const img = new Image();
      img.src = fileUrl;
      win.document.body.appendChild(img);
    }
  }

  openRefuseModal() {
    this.showRefuseModal = true;
  }

  closeRefuseModal() {
    this.showRefuseModal = false;
  }

  refuseRequest() {
    this.verifiyRequest.status = "refused";
    this.verifiyRequest.refused_motivation = this.t_motivation;
    this.verifiyRequest.refused_date = moment();
    this.userService.updateVerifyAccount(this.verifiyRequest._id, "refused", this.t_motivation).subscribe(
      response => {
        this.verifiyRequest.status = "refused";
        this.showDetails(this.verifiyRequest);
        this.toastr.clear();
        this.toastr.success("Richiesta aggiornata con successo")
        this.closeRefuseModal();
      },
      error => {
        this.toastr.clear();
        this.toastr.error(error.error);
        this.closeRefuseModal();
      }
    )
  }

  acceptRequest() {
    this.verifiyRequest.status = "verified";
    this.userService.updateVerifyAccount(this.verifiyRequest._id, "verified", null).subscribe(
      response => {
        this.verifiyRequest.status = "verified";
        this.showDetails(this.verifiyRequest);
        this.toastr.clear();
        this.toastr.success("Richiesta aggiornata con successo")
      },
      error => {
        this.toastr.clear();
        this.toastr.error(error.error);
      }
    );
  }

  showDetails(artistRequest: any): void {
    const params = this.globalService.encodeParams({
      artistRequest: artistRequest
    });
    this.router.navigate([ROUTE_LIST.artist.detail, params]);
  }

}
