import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { EventPosterComponent } from './components/event-poster/event-poster.component';
import { MatIconModule } from '@angular/material/icon';
import { EventDetailFormComponent } from './forms/event-detail-form/event-detail-form.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventTicketListComponent } from './components/event-ticket-list/event-ticket-list.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { momentAdapterFactory } from 'src/app/app.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CoreModule } from 'src/app/core/core.module';
import { EventFilterFormComponent } from './forms/event-filter-form/event-filter-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventBestTicketFormComponent } from './forms/event-best-ticket-form/event-best-ticket-form.component';
import { EventPlanSeatTicketFormComponent } from './forms/event-plan-seat-ticket-form/event-plan-seat-ticket-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    EventCreateComponent,
    EventDetailComponent,
    EventPageComponent,
    EventPosterComponent,
    EventDetailFormComponent,
    EventListComponent,
    EventTicketListComponent,
    EventFilterFormComponent,
    EventBestTicketFormComponent,
    EventPlanSeatTicketFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    EventRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    FlatpickrModule.forRoot(),
    NgSelectModule,
  ],
  exports: [
    EventCreateComponent,
    EventDetailComponent
  ],
  providers: [
  ],
  id: 'Event'
})
export class EventModule {
  static forRoot() {
    return {
      ngModule: EventModule,
      providers: [],
    };
  }
}
