import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFeaturedComponent } from './artist-featured.component';

describe('ArtistFeaturedComponent', () => {
  let component: ArtistFeaturedComponent;
  let fixture: ComponentFixture<ArtistFeaturedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistFeaturedComponent]
    });
    fixture = TestBed.createComponent(ArtistFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
