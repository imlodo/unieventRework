import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAndHelpComponent } from './support-and-help.component';

describe('SupportAndHelpComponent', () => {
  let component: SupportAndHelpComponent;
  let fixture: ComponentFixture<SupportAndHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportAndHelpComponent]
    });
    fixture = TestBed.createComponent(SupportAndHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
