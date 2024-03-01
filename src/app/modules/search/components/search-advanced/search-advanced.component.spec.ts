import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdvancedComponent } from './search-advanced.component';

describe('SearchAdvancedComponent', () => {
  let component: SearchAdvancedComponent;
  let fixture: ComponentFixture<SearchAdvancedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAdvancedComponent]
    });
    fixture = TestBed.createComponent(SearchAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
