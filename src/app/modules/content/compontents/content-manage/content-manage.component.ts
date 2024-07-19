import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services';
import { ContentService } from 'src/app/core/services/contentService/content.service';

@Component({
  selector: 'unievent-content-manage',
  templateUrl: './content-manage.component.html',
  styleUrls: ['./content-manage.component.scss']
})
export class ContentManageComponent {
  contentList: Array<any> = new Array<any>();
  currentUser: User = null;
  privacyContent: string[] = new Array();
  showManageCouponPanel: boolean = false;
  showEditCoupon: boolean = false;
  currentEventId: string  = null;
  showAddCoupon: boolean = false;
  currentCouponEvent: any = null;
  couponList: Array<{ coupon_id: string, event_id: string, coupon_code: string, discount: number }> = new Array();
  formCoupon = new FormGroup({
    coupon_code: new FormControl(''), 
    discount: new FormControl('')
  });

  constructor(private router: Router,
    private cookieService: CookieService,
    private contentService: ContentService,
    private toastr: ToastrService,
    private globalService: GlobalService
  ) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }

    this.contentService.getContentsByCurrentUser().subscribe(
      (response: any) => {
        this.contentList = response.content_list;
        for (let i = 0; i < response.content_list.length; i++) {
          this.privacyContent[i] = response.content_list[i].t_privacy;
        }
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nel recupero dei tuoi contenuti');
      }
    );
  }

  changeEventPrivacy(event: any, item: any, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.contentService.updateContentPrivacy(item.id, this.privacyContent[index]).subscribe(
      (response: any) => {
        item.t_privacy = this.privacyContent[index];
      },
      error => {
        this.privacyContent[index] = item.t_privacy;
        this.toastr.clear();
        this.toastr.error('Errore nell\' aggiornamento della privacy');
      }
    );
  }

  navigateToContentDetail(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      item: item
    });
    this.router.navigate([link, params]);
  }


  deleteContent(event: any, item: any, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.contentService.deleteContent(item.id).subscribe(
      (response: any) => {
        this.contentList = [...this.contentList.filter(el => el.id != item.id)];
        this.toastr.clear();
        this.toastr.success("Contenuto eliminato con successo.")
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\'eliminazione del contenuto');
      }
    );
  }

  deleteCoupon(event: any, item: any) {
    event.preventDefault();
    event.stopPropagation();
    this.contentService.deleteCoupon(item.id).subscribe(
      (response: any) => {
        this.couponList = [...this.couponList.filter(el => el.coupon_id != item.coupon_id)];
        this.toastr.clear();
        this.toastr.success("Coupon eliminato con successo.")
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\'eliminazione del coupon');
      }
    );
  }

  openEventCouponModal(event: any, item: any, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.contentService.getCouponsForEvent(item.id).subscribe(
      (response: any) => {
        this.couponList = response.coupons;
        this.currentEventId = item.id;
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nel recupero dei coupons');
      }
    );
    this.currentCouponEvent = item;
    this.showManageCouponPanel = true;
  }

  openAddCoupon() {
    this.showAddCoupon = true;
  }

  closeAddCoupon() {
    this.showAddCoupon = false;
  }

  openEditCoupon() {
    this.showEditCoupon = true;
  }

  closeEditCoupon() {
    this.showEditCoupon = false;
  }

  clearManageCoupon() {
    this.showManageCouponPanel = false;
    this.currentCouponEvent = null;
  }

  addCoupon(form: any) {
    this.contentService.addCoupon(form.value.coupon_code, form.value.discount, this.currentEventId).subscribe(
      (response: any) => {
        this.couponList.push(response.coupon);
        this.toastr.clear();
        this.toastr.success("Coupon aggiunto con successo");
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\'aggiunta del coupon');
      }
    );
    this.closeAddCoupon();
  }
}
