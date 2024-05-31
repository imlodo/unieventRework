import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AboutRoutingModule } from './about-routing.module';
import { OurMissionsComponent } from './components/our-missions/our-missions.component';

@NgModule({
  declarations: [
    OurMissionsComponent
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
    AboutRoutingModule,
    HttpClientModule
  ],
  exports: [
  ],
  id: 'Artist'
})
export class AboutModule {
  static forRoot() {
    return {
      ngModule: AboutModule,
      providers: [],
    };
  }
}
