import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratePanelComponent } from './moderate-panel.component';

describe('ModeratePanelComponent', () => {
  let component: ModeratePanelComponent;
  let fixture: ComponentFixture<ModeratePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratePanelComponent]
    });
    fixture = TestBed.createComponent(ModeratePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
