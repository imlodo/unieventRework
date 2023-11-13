import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentStep1FormComponent } from './payment-step1-form/payment-step1-form.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent,
    PaymentStep1FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    CoreModule,
    RxReactiveFormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgbModule,
    NgbModalModule
  ],
  exports: [
  ],
  providers: [
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
