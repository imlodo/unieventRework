import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCommitmentComponent } from './our-commitment.component';

describe('OurCommitmentComponent', () => {
  let component: OurCommitmentComponent;
  let fixture: ComponentFixture<OurCommitmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurCommitmentComponent]
    });
    fixture = TestBed.createComponent(OurCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
