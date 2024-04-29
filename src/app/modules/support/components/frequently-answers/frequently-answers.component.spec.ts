import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAnswersComponent } from './frequently-answers.component';

describe('FrequentlyAnswersComponent', () => {
  let component: FrequentlyAnswersComponent;
  let fixture: ComponentFixture<FrequentlyAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequentlyAnswersComponent]
    });
    fixture = TestBed.createComponent(FrequentlyAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
