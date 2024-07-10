import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CoreModule } from 'src/app/core/core.module';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserFollowedListComponent } from './components/user-followed-list/user-followed-list.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserFollowedListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    UserRoutingModule,
    InfiniteScrollModule,
    CoreModule
  ],
  exports: [
  ],
  providers: [
  ],
  id: 'User'
})
export class UserModule {
  static forRoot() {
    return {
      ngModule: UserModule,
      providers: [],
    };
  }
}
