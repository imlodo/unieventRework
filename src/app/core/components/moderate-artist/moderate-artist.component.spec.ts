import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateArtistComponent } from './moderate-artist.component';

describe('ModerateArtistComponent', () => {
  let component: ModerateArtistComponent;
  let fixture: ComponentFixture<ModerateArtistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerateArtistComponent]
    });
    fixture = TestBed.createComponent(ModerateArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
