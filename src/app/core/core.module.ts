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
		NavbarLeftMenuComponent,
  NavbarCreateComponent,
  NavbarSearchComponent,
  NavbarSearchbarComponent
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
		SearchCollapseComponent,
		EventFeaturedComponent,
		EventNearComponent,
		EventMostRatedComponent,
		ArtistFeaturedComponent,
		FeaturedTopicComponent,
		FooterComponent,
		FilterByTypePipe,
		NavbarLeftMenuComponent
	],
	providers: [
	]
})
export class CoreModule { }
