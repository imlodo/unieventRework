import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, SignupComponent, SearchCollapseComponent, NavbarComponent, HomepageComponent, ModalComponent } from './components';
import { LoginFormComponent, SignupFormComponent } from './forms';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchFormComponent } from './forms/search-form/search-form.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';

@NgModule({
	declarations: [
		LoginComponent,
		SignupComponent,
		LoginFormComponent,
		NotFoundComponent,
		InternalServerErrorComponent,
		HomepageComponent,
		SignupFormComponent,
		NavbarComponent,
		ModalComponent,
		SearchCollapseComponent,
		SearchFormComponent,
		SlideshowComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MatTooltipModule,
		ReactiveFormsModule,
		NgSelectModule,
		ToastrModule.forRoot(), // ToastrModule added
	],
	exports: [
		NavbarComponent,
		ModalComponent,
		SearchCollapseComponent
	],
	providers: [
	]
})
export class CoreModule { }
