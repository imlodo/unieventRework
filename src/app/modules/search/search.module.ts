import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchAdvancedComponent } from './components/search-advanced/search-advanced.component';
import { SearchRoutingModule } from './search-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterByTypePipe } from 'src/app/core/pipe/filter-by-type.pipe';
import { CoreModule } from 'src/app/core/core.module';
import { ApproximateNumberPipe } from 'src/app/core/pipe/approximate-number.pipe';

@NgModule({
  declarations: [
    SearchResultComponent,
    SearchAdvancedComponent,
    ApproximateNumberPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    InfiniteScrollModule,
    SearchRoutingModule,
    CoreModule,
    
  ],
  exports: [
  ],
  id: 'Payment'
})
export class SearchModule {
  static forRoot() {
    return {
      ngModule: SearchModule,
      providers: [],
    };
  }
}
