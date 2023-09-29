import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, SignupComponent, SearchCollapseComponent, NavbarComponent, HomepageComponent } from './components';
import { LoginFormComponent,SignupFormComponent } from './forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchFormComponent } from './forms/search-form/search-form.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';


@NgModule({
	declarations: [
		LoginComponent,
		SignupComponent,
		LoginFormComponent,
		NavbarComponent,
		HomepageComponent,
		SignupFormComponent,
		SearchCollapseComponent,
  SearchFormComponent,
  SlideshowComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MatTooltipModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		NgSelectModule,
		ToastrModule.forRoot(), // ToastrModule added
	],
	exports: [
	],
	  
})
export class CoreModule { }
