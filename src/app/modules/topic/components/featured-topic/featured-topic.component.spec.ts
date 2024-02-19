import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTopicComponent } from './featured-topic.component';

describe('FeaturedTopicComponent', () => {
  let component: FeaturedTopicComponent;
  let fixture: ComponentFixture<FeaturedTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedTopicComponent]
    });
    fixture = TestBed.createComponent(FeaturedTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
