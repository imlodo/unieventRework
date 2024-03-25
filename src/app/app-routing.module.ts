import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent, InternalServerErrorComponent, LoginComponent, NotFoundComponent, SignupComponent } from './core/components';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		children: [
			{
				path: '',
				component: HomepageComponent,
				data: {
					title: 'Homepage',
				},
			}
		]
	},
	{
		path: '',
		children: [
			{
				path: 'payment',
				loadChildren: () => import('./modules/payment/payment.module').then((m) => m.PaymentModule),
			},
			{
				path: 'event',
				loadChildren: () => import('./modules/event/event.module').then((m) => m.EventModule),
			},
			{
				path: 'notification',
				loadChildren: () => import('./modules/notification/notification.module').then((m) => m.NotificationModule),

			},
			{
				path: 'search',
				loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule),
			},
			{
				path: 'messages',
				loadChildren: () => import('./modules/message/message.module').then((m) => m.MessageModule),

			},
			{
				path: 'tickets',
				loadChildren: () => import('./modules/ticket/ticket.module').then((m) => m.TicketModule),
			},
			{
				path: '@/:subpath/content',
				loadChildren: () => import('./modules/content/content.module').then((m) => m.ContentModule),
			},
			{
				path: '@/:userAliasGenerated',
				loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
			}
		]
	},
	{
		path: 'login',
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
	},
	{
		path: '404',
		component: NotFoundComponent,
		data: {
			title: 'Page 404',
		},
	},
	{
		path: '500',
		component: InternalServerErrorComponent,
		data: {
			title: 'Page 500',
		},
	},
	{ path: '**', component: NotFoundComponent }

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
