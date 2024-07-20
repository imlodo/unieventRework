import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateTicketsComponent } from './moderate-tickets.component';

describe('ModerateTicketsComponent', () => {
  let component: ModerateTicketsComponent;
  let fixture: ComponentFixture<ModerateTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerateTicketsComponent]
    });
    fixture = TestBed.createComponent(ModerateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
