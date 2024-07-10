import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowedListComponent } from './user-followed-list.component';

describe('UserFollowedListComponent', () => {
  let component: UserFollowedListComponent;
  let fixture: ComponentFixture<UserFollowedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFollowedListComponent]
    });
    fixture = TestBed.createComponent(UserFollowedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
