import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametricModalComponent } from './parametric-modal.component';

describe('ParametricModalComponent', () => {
  let component: ParametricModalComponent;
  let fixture: ComponentFixture<ParametricModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametricModalComponent]
    });
    fixture = TestBed.createComponent(ParametricModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
