import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBestTicketFormComponent } from './event-best-ticket-form.component';

describe('EventBestTicketFormComponent', () => {
  let component: EventBestTicketFormComponent;
  let fixture: ComponentFixture<EventBestTicketFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventBestTicketFormComponent]
    });
    fixture = TestBed.createComponent(EventBestTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
