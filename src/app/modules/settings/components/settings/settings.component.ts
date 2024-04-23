import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'unievent-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  activeMenu: string = 'account';
  marginTopOffset: number = 80;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(private router : Router) { }

  ngAfterViewInit() {
    this.activeMenu = window.location.href.split("#")[1] || 'account'; // Utilizzo '||' per impostare 'account' se il frammento è vuoto
    this.scrollTo(this.activeMenu);
  }

  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      this.router.navigate([], { fragment: section });
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
    this.activeMenu = section;
  }

}
