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
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './components/explore/explore.component';
import { CoreModule } from 'src/app/core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ExploreComponent
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
    ExploreRoutingModule,
    HttpClientModule,
    CoreModule,
    InfiniteScrollModule
  ],
  exports: [
  ],
  id: 'Explore'
})
export class ExportModule {
  static forRoot() {
    return {
      ngModule: ExportModule,
      providers: [],
    };
  }
}
