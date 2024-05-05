import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistVerifyComponent } from './artist-verify.component';

describe('ArtistVerifyComponent', () => {
  let component: ArtistVerifyComponent;
  let fixture: ComponentFixture<ArtistVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistVerifyComponent]
    });
    fixture = TestBed.createComponent(ArtistVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
