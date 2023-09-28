import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollapseComponent } from './search-collapse.component';

describe('SearchCollapseComponent', () => {
  let component: SearchCollapseComponent;
  let fixture: ComponentFixture<SearchCollapseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCollapseComponent]
    });
    fixture = TestBed.createComponent(SearchCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
