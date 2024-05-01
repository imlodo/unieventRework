import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchRoutingModule } from './search-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoreModule } from 'src/app/core/core.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    InfiniteScrollModule,
    SearchRoutingModule,
    CoreModule
  ],
  exports: [
  ],
  id: 'Search'
})
export class SearchModule {
  static forRoot() {
    return {
      ngModule: SearchModule,
      providers: [],
    };
  }
}
