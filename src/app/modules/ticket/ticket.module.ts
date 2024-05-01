import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoreModule } from 'src/app/core/core.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSortModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    InfiniteScrollModule,
    TicketRoutingModule,
    CoreModule
  ],
  exports: [
  ],
  id: 'Ticket'
})
export class TicketModule {
  static forRoot() {
    return {
      ngModule: TicketModule,
      providers: [],
    };
  }
}
