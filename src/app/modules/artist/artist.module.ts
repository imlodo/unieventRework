import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ArtistRoutingModule } from './artist-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ArtistVerifyComponent } from './components/artist-verify/artist-verify.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    ArtistVerifyComponent,
    ArtistDetailComponent
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
    ArtistRoutingModule,
    HttpClientModule, 
    CoreModule
  ],
  exports: [
  ],
  id: 'Artist'
})
export class ArtistModule {
  static forRoot() {
    return {
      ngModule: ArtistModule,
      providers: [],
    };
  }
}
