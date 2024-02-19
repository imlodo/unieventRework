import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMostRatedComponent } from './event-most-rated.component';

describe('EventMostRatedComponent', () => {
  let component: EventMostRatedComponent;
  let fixture: ComponentFixture<EventMostRatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventMostRatedComponent]
    });
    fixture = TestBed.createComponent(EventMostRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
