import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLeftMenuComponent } from './navbar-left-menu.component';

describe('NavbarLeftMenuComponent', () => {
  let component: NavbarLeftMenuComponent;
  let fixture: ComponentFixture<NavbarLeftMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLeftMenuComponent]
    });
    fixture = TestBed.createComponent(NavbarLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
