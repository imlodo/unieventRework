import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LegalRoutingModule } from './legal-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DataProcessingComponent } from './components/data-processing/data-processing.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    DataProcessingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    LegalRoutingModule,
    HttpClientModule
  ],
  exports: [
  ],
  id: 'Legal'
})
export class LegalModule {
  static forRoot() {
    return {
      ngModule: LegalModule,
      providers: [],
    };
  }
}
