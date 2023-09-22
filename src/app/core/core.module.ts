import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, SignupComponent } from './components';
import { LoginFormComponent } from './forms/login-form/login-form.component';

@NgModule({
	declarations: [
		LoginComponent,
		SignupComponent,
		LoginFormComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
	],
})
export class CoreModule { }
