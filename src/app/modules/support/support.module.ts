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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { SupportAndHelpComponent } from './components/support-and-help/support-and-help.component';
import { SupportRoutingModule } from './support-routing.module';
import { CoreModule } from '../../core/core.module';
import { FrequentlyAnswersComponent } from './components/frequently-answers/frequently-answers.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { HttpClientModule } from '@angular/common/http';
import { SupportTicketDetailComponent } from './components/support-ticket-detail/support-ticket-detail.component';

@NgModule({
  declarations: [
    SupportAndHelpComponent,
    FrequentlyAnswersComponent,
    TicketsComponent,
    SupportTicketDetailComponent
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
    SupportRoutingModule,
    CoreModule,
    HttpClientModule
  ],
  exports: [
  ],
  id: 'Support'
})
export class SupportModule {
  static forRoot() {
    return {
      ngModule: SupportModule,
      providers: [],
    };
  }
}
