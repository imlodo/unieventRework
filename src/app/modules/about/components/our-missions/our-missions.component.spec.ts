import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMissionsComponent } from './our-missions.component';

describe('OurMissionsComponent', () => {
  let component: OurMissionsComponent;
  let fixture: ComponentFixture<OurMissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurMissionsComponent]
    });
    fixture = TestBed.createComponent(OurMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
