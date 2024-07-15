import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../../models/user';
import { ExploreItemType, ProfileItemType, ROUTE_LIST, USER_TYPE } from '../../utility/global-constant';
import { GlobalService, UserService } from '../../services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'unievent-navbar-left-menu',
  templateUrl: './navbar-left-menu.component.html',
  styleUrls: ['./navbar-left-menu.component.scss']
})
export class NavbarLeftMenuComponent implements AfterViewInit {
  isDNone: boolean;
  activePath: string;
  currentUser: User;
  followedUser: Array<User> = new Array();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private globalService: GlobalService,
    private cookieService: CookieService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url;
      }
    });
    try{
      this.followedUser = JSON.parse(this.cookieService.get("followed_users")) as User[];
    }
    catch(error){
      this.followedUser = []
    }
  }

  ngAfterViewInit(): void {
    this.updateIsDNone();
  }

  private updateIsDNone(): void {
    this.isDNone = window.innerWidth < 992;
    this.updateMargin();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateIsDNone();
  }

  navigateToUserProfile(type: string) {
    let link = "/@/" + this.currentUser.t_alias_generated;
    let params = this.globalService.encodeParams({
      profileItemType: type === "Booked" ? ProfileItemType.Booked : type === "Liked" ? ProfileItemType.Liked : ProfileItemType.Content
    });
    this.router.navigate([link, params]);
  }

  navigateToItemUserProfile(t_alias_generated: string) {
    let link = "/@/" + t_alias_generated
    let params = this.globalService.encodeParams({
      profileItemType: ProfileItemType.Content
    });
    this.router.navigate([link, params]);
  }

  navigateToViewAllFollowedUser(){
    this.router.navigate([ROUTE_LIST.followed])
  }

  navigateToExploreSection(type: string) {
    let params = this.globalService.encodeParams({
      exploreItemType: ExploreItemType[type]
    });
    this.router.navigate([ROUTE_LIST.explore, params]);
  }

  private updateMargin(): void {
    if (!this.isDNone) {
      //this.renderer.setStyle(this.el.nativeElement, 'margin-right', '240px');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'margin-right');
    }
  }

  isLinkActive(link: string): boolean {
    return this.activePath === link;
  }

}
