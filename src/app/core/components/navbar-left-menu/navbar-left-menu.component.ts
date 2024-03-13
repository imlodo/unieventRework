import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'unievent-navbar-left-menu',
  templateUrl: './navbar-left-menu.component.html',
  styleUrls: ['./navbar-left-menu.component.scss']
})
export class NavbarLeftMenuComponent implements AfterViewInit {
  isDNone: boolean;
  activePath: string;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) {
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

  private updateMargin(): void {
    if (!this.isDNone) {
      this.renderer.setStyle(this.el.nativeElement, 'margin-right', '240px');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'margin-right');
    }
  }

  isLinkActive(link: string): boolean {
    return this.activePath === link;
  }
}
