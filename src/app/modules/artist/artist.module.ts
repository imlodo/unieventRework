import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ArtistRoutingModule } from './artist-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    ArtistRoutingModule,
    HttpClientModule
  ],
  exports: [
  ],
  id: 'Arist'
})
export class ArtistModule {
  static forRoot() {
    return {
      ngModule: ArtistModule,
      providers: [],
    };
  }
}
