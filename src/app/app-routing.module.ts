import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent, InternalServerErrorComponent, LoginComponent, NotFoundComponent, SignupComponent } from './core/components';
import { ContentCreateComponent } from './modules/content/compontents/content-create/content-create.component';
import { OurMissionsComponent } from './modules/about/components/our-missions/our-missions.component';
import { OurCommitmentComponent } from './modules/about/components/our-commitment/our-commitment.component';
import { PartnerComponent } from './modules/about/components/partner/partner.component';
import { PrivacyPolicyComponent } from './modules/legal/components/privacy-policy/privacy-policy.component';
import { DataProcessingComponent } from './modules/legal/components/data-processing/data-processing.component';
import { CookiePolicyComponent } from './modules/legal/components/cookie-policy/cookie-policy.component';
import { RulesComponent } from './modules/legal/components/rules/rules.component';

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
				path: 'artist',
				loadChildren: () => import('./modules/artist/artist.module').then((m) => m.ArtistModule),
			},
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
				path: 'settings',
				loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule)
			},
			{
				path: 'supports',
				loadChildren: () => import('./modules/support/support.module').then((m) => m.SupportModule)
			},
			{
				path: '@/:subpath/content',
				loadChildren: () => import('./modules/content/content.module').then((m) => m.ContentModule),
			},
			{
				path: '@/:userAliasGenerated',
				loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
			},
			{
				path: 'legal',
				loadChildren: () => import('./modules/legal/legal.module').then((m) => m.LegalModule),
			},
			{
				path: 'create',
				component: ContentCreateComponent,
				data: {
					title: 'Crea Contenuto',
				},
			},
			{
				path: 'our-mission',
				component: OurMissionsComponent,
				data: {
					title: 'La nostra missione',
				},
			},
			{
				path: 'our-commitment',
				component: OurCommitmentComponent,
				data: {
					title: 'Il nostro impegno',
				},
			},
			{
				path: 'partner',
				component: PartnerComponent,
				data: {
					title: 'Partners',
				},
			},
			{
				path: 'privacy-policy',
				component: PrivacyPolicyComponent,
				data: {
					title: 'Privacy policy',
				},
			},
			{
				path: 'terms-of-use',
				component: DataProcessingComponent,
				data: {
					title: 'Terms of use',
				},
			},
			{
				path: 'cookie-policy',
				component: CookiePolicyComponent,
				data: {
					title: 'Terms of use',
				},
			},
			{
				path: 'rules',
				component: RulesComponent,
				data: {
					title: 'Terms of use',
				},
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
