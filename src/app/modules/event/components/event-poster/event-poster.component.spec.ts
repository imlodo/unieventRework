import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPosterComponent } from './event-poster.component';

describe('EventPosterComponent', () => {
  let component: EventPosterComponent;
  let fixture: ComponentFixture<EventPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventPosterComponent]
    });
    fixture = TestBed.createComponent(EventPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
