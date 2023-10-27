import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanSeatTicketFormComponent } from './event-plan-seat-ticket-form.component';

describe('EventPlanSeatTicketFormComponent', () => {
  let component: EventPlanSeatTicketFormComponent;
  let fixture: ComponentFixture<EventPlanSeatTicketFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlanSeatTicketFormComponent]
    });
    fixture = TestBed.createComponent(EventPlanSeatTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
