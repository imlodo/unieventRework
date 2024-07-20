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
import { EventFeaturedComponent } from '../modules/event/components/event-featured/event-featured.component';
import { EventNearComponent } from '../modules/event/components/event-near/event-near.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventMostRatedComponent } from '../modules/event/components/event-most-rated/event-most-rated.component';
import { ArtistFeaturedComponent } from '../modules/artist/components/artist-featured/artist-featured.component';
import { FeaturedTopicComponent } from '../modules/topic/components/featured-topic/featured-topic.component';
import { NavbarNotificationComponent } from './components/navbar-notification/navbar-notification.component';
import { NotificationSettingComponent } from './components/notification-setting/notification-setting.component';
import { NavbarProfileComponent } from './components/navbar-profile/navbar-profile.component';
import { NavbarChatComponent } from './components/navbar-chat/navbar-chat.component';
import { FilterByTypePipe } from './pipe/filter-by-type.pipe';
import { NavbarLeftMenuComponent } from './components/navbar-left-menu/navbar-left-menu.component';
import { NavbarCreateComponent } from './components/navbar-create/navbar-create.component';
import { NavbarSearchComponent } from './components/navbar-search/navbar-search.component';
import { NavbarSearchbarComponent } from './components/navbar-searchbar/navbar-searchbar.component';
import { ContentInfiniteScrollComponent } from '../modules/content/compontents/content-infinite-scroll/content-infinite-scroll.component';
import { ApproximateNumberPipe } from './pipe/approximate-number.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ParametricModalComponent } from './components/parametric-modal/parametric-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from './forms/forgot-password-form/forgot-password-form.component';
import { NgxStarsComponent } from './components/ngx-stars/ngx-stars.component';
import { HistoryComponent } from './components/history/history.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ModeratePanelComponent } from './components/moderate-panel/moderate-panel.component';
import { ModerateTicketsComponent } from './components/moderate-tickets/moderate-tickets.component';
import { ModerateArtistComponent } from './components/moderate-artist/moderate-artist.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

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
		EventFeaturedComponent,
		EventNearComponent,
		EventMostRatedComponent,
		SlideshowComponent,
		ArtistFeaturedComponent,
		FeaturedTopicComponent,
		FooterComponent,
		NavbarNotificationComponent,
		NotificationSettingComponent,
		NavbarProfileComponent,
		NavbarChatComponent,
		FilterByTypePipe,
		DateFormatPipe,
		NavbarLeftMenuComponent,
		NavbarCreateComponent,
		NavbarSearchComponent,
		NavbarSearchbarComponent,
		ContentInfiniteScrollComponent,
		ApproximateNumberPipe,
		ParametricModalComponent,
		ForgotPasswordComponent,
		ForgotPasswordFormComponent,
		NgxStarsComponent,
		HistoryComponent,
		ResetPasswordComponent,
		ModeratePanelComponent,
		ModerateTicketsComponent,
		ModerateArtistComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MatTooltipModule,
		MatDialogModule,
		ReactiveFormsModule,
		InfiniteScrollModule,
		NgSelectModule,
		MatTableModule,
		MatPaginatorModule,
		ToastrModule.forRoot(), // ToastrModule added
	],
	exports: [
		NavbarComponent,
		NgxStarsComponent,
		ContentInfiniteScrollComponent,
		ModalComponent,
		SearchCollapseComponent,
		EventFeaturedComponent,
		EventNearComponent,
		EventMostRatedComponent,
		ArtistFeaturedComponent,
		FeaturedTopicComponent,
		FooterComponent,
		FilterByTypePipe,
		NavbarLeftMenuComponent,
		ApproximateNumberPipe,
		DateFormatPipe
	],
	providers: [
	]
})
export class CoreModule { }