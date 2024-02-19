import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNearComponent } from './event-near.component';

describe('EventNearComponent', () => {
  let component: EventNearComponent;
  let fixture: ComponentFixture<EventNearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventNearComponent]
    });
    fixture = TestBed.createComponent(EventNearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
