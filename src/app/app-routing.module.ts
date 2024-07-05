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
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { HistoryComponent } from './core/components/history/history.component';
import { VisitedPagesGuard } from './core/guards/VisitedPagesGuard/visited-pages.guard';
import { AuthGuard } from './core/guards/authGuard/auth-guard';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		children: [
			{
				path: '',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: HomepageComponent,
				data: {
					title: 'Homepage',
				}
			}
		]
	},
	{
		path: '',
		children: [
			{
				path: 'artist',
				loadChildren: () => import('./modules/artist/artist.module').then((m) => m.ArtistModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'payment',
				loadChildren: () => import('./modules/payment/payment.module').then((m) => m.PaymentModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'event',
				loadChildren: () => import('./modules/event/event.module').then((m) => m.EventModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'notification',
				loadChildren: () => import('./modules/notification/notification.module').then((m) => m.NotificationModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'search',
				loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'messages',
				loadChildren: () => import('./modules/message/message.module').then((m) => m.MessageModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'tickets',
				loadChildren: () => import('./modules/ticket/ticket.module').then((m) => m.TicketModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'settings',
				loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'supports',
				loadChildren: () => import('./modules/support/support.module').then((m) => m.SupportModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: '@/:subpath/content',
				loadChildren: () => import('./modules/content/content.module').then((m) => m.ContentModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: '@/:userAliasGenerated',
				loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'legal',
				loadChildren: () => import('./modules/legal/legal.module').then((m) => m.LegalModule),
				canActivate: [AuthGuard, VisitedPagesGuard],
			},
			{
				path: 'explore',
				loadChildren: () => import('./modules/explore/explore.module').then((m) => m.ExportModule),
				canActivate: [AuthGuard, VisitedPagesGuard]
			},
			{
				path: 'create',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: ContentCreateComponent,
				data: {
					title: 'Crea Contenuto',
				},
			},
			{
				path: 'our-mission',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: OurMissionsComponent,
				data: {
					title: 'La nostra missione',
				},
			},
			{
				path: 'our-commitment',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: OurCommitmentComponent,
				data: {
					title: 'Il nostro impegno',
				},
			},
			{
				path: 'partner',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: PartnerComponent,
				data: {
					title: 'Partners',
				},
			},
			{
				path: 'privacy-policy',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: PrivacyPolicyComponent,
				data: {
					title: 'Privacy policy',
				},
			},
			{
				path: 'terms-of-use',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: DataProcessingComponent,
				data: {
					title: 'Termini e condizioni',
				},
			},
			{
				path: 'cookie-policy',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: CookiePolicyComponent,
				data: {
					title: 'Trattamento cookie',
				},
			},
			{
				path: 'rules',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: RulesComponent,
				data: {
					title: 'Regolamenti',
				},
			},
			{
				path: 'forgot-password',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: ForgotPasswordComponent,
				data: {
					title: 'Password Dimenticata',
				},
			},
			{
				path: 'history',
				canActivate: [AuthGuard, VisitedPagesGuard],
				component: HistoryComponent,
				data: {
					title: 'Cronologia',
				},
			},
			{
				path: 'reset-password',
				canActivate: [VisitedPagesGuard],
				component: ResetPasswordComponent,
				data: {
					title: 'Conferma Reset Password',
				},
			},
		]
	},
	{
		path: 'login',
		canActivate: [AuthGuard, VisitedPagesGuard],
		component: LoginComponent,
		data: {
			title: 'Login',
		},
		pathMatch: 'full',
	},
	{
		path: 'signup',
		canActivate: [AuthGuard, VisitedPagesGuard],
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
