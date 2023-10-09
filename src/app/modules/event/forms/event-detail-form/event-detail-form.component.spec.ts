import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFormComponent } from './event-detail-form.component';

describe('EventDetailFormComponent', () => {
  let component: EventDetailFormComponent;
  let fixture: ComponentFixture<EventDetailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailFormComponent]
    });
    fixture = TestBed.createComponent(EventDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
