import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFeaturedComponent } from './event-featured.component';

describe('EventFeaturedComponent', () => {
  let component: EventFeaturedComponent;
  let fixture: ComponentFixture<EventFeaturedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventFeaturedComponent]
    });
    fixture = TestBed.createComponent(EventFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
