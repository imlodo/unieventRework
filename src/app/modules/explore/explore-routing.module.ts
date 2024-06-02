import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowedComponent } from './components/followed/followed.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { EventsComponent } from './components/events/events.component';
import { TopicsComponent } from './components/topics/topics.component';
import { ExploreComponent } from './components/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Explore',
    },
    children: [
      {
        path: '',
        component: ExploreComponent,
        data: {
          title: 'Esplora contenuti'
        }
      },
      {
        path: 'followed',
        component: FollowedComponent,
        data: {
          title: 'Contenuti da seguiti'
        }
      },
      {
        path: 'featured',
        component: FeaturedComponent,
        data: {
          title: 'Tendenze'
        }
      },
      {
        path: 'events',
        component: EventsComponent,
        data: {
          title: 'Eventi'
        }
      },
      {
        path: 'topics',
        component: TopicsComponent,
        data: {
          title: 'Argomenti'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
