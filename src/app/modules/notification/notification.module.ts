import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NotificationRoutingModule } from './notification-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { momentAdapterFactory } from 'src/app/app.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MatIconModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NotificationRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    FlatpickrModule.forRoot(),
    NgSelectModule,
  ],
  exports: [
    NotificationListComponent
  ],
  providers: [
  ],
  id: 'Notification'
})
export class NotificationModule {
  static forRoot() {
    return {
      ngModule: NotificationModule,
      providers: [],
    };
  }
}
