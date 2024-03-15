import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentInfiniteScrollComponent } from './content-infinite-scroll.component';

describe('ContentInfiniteScrollComponent', () => {
  let component: ContentInfiniteScrollComponent;
  let fixture: ComponentFixture<ContentInfiniteScrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentInfiniteScrollComponent]
    });
    fixture = TestBed.createComponent(ContentInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
