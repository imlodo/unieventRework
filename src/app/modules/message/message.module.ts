import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MessageRoutingModule } from './message-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { momentAdapterFactory } from 'src/app/app.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageEmoticonPanelComponent } from './components/message-emoticon-panel/message-emoticon-panel.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MessageListComponent,
    MessageEmoticonPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MessageRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    FlatpickrModule.forRoot(),
    NgSelectModule,
  ],
  exports: [
  ],
  providers: [
  ],
  id: 'Message'
})
export class MessageModule {
  static forRoot() {
    return {
      ngModule: MessageModule,
      providers: [],
    };
  }
}
