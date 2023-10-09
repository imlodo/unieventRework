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


@NgModule({
  declarations: [
    EventCreateComponent,
    EventDetailComponent,
    EventPageComponent,
    EventPosterComponent,
    EventDetailFormComponent,
    EventListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    EventRoutingModule,
  ],
  exports: [
    EventCreateComponent,
    EventDetailComponent,
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
