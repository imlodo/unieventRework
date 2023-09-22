import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignupComponent } from './core/components';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		data: {
			title: 'Login',
		},
		pathMatch: 'full',
	},
	{
		path: 'signup',
		component: SignupComponent,
		data: {
			title: 'Registrazione',
		},
		pathMatch: 'full',
	}
	/*{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
		data: {
			title: 'Forgot Password',
		},
	},
	{
		path: '404',
		component: P404Component,
		data: {
			title: 'Page 404',
		},
	},
	{
		path: '500',
		component: P500Component,
		data: {
			title: 'Page 500',
		},
	},
	{
		path: '',
		component: DefaultLayoutComponent,
		children: [
			{
				path: 'user',
				loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'revenue',
				loadChildren: () => import('./modules/revenue/revenue.module').then((m) => m.RevenueModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'product',
				loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'practice',
				loadChildren: () => import('./modules/practice/practice.module').then((m) => m.PracticeModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'customer',
				loadChildren: () => import('./modules/customer/customer.module').then((m) => m.CustomerModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'corporate',
				loadChildren: () => import('./modules/corporate/corporate.module').then((m) => m.CorporateModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'bank',
				loadChildren: () => import('./modules/bank/bank.module').then((m) => m.BankModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			},
			{
				path: 'export',
				loadChildren: () => import('./modules/oam/oam.module').then((m) => m.OamModule),
				canLoad: [AuthGuard],
				canActivate: [AuthGuard],
			}
		],
	},
	{ path: '**', component: P404Component },*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
