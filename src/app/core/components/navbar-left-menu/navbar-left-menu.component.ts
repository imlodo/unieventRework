import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../../models/user';
import { ProfileItemType, USER_TYPE } from '../../utility/global-constant';
import { GlobalService } from '../../services';

@Component({
  selector: 'unievent-navbar-left-menu',
  templateUrl: './navbar-left-menu.component.html',
  styleUrls: ['./navbar-left-menu.component.scss']
})
export class NavbarLeftMenuComponent implements AfterViewInit {
  isDNone: boolean;
  activePath: string;
  currentUser: User = {
    t_name: "Mario",
    t_surname: "Baldi",
    t_alias_generated: "mariobaldi1",
    t_description: "Sono un bel ragazzo",
    t_profile_photo: "/assets/img/userExampleImg.jpeg",
    is_verified: true,
    t_type: USER_TYPE.CREATOR
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router, private globalService: GlobalService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url;
      }
    });
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
      profileItemType: ProfileItemType.Booked
    });
    switch (type) {
      case "Booked":
        this.router.navigate([link, params]);
        break;
      case "Liked":
        params = this.globalService.encodeParams({
          profileItemType: ProfileItemType.Liked
        });
        this.router.navigate([link, params]);
        break;
      default:
        this.router.navigate([link]);
        break;
    }
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
