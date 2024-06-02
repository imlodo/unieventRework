import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Explore',
    },
    children: [
      {
        path: ':params',
        component: ExploreComponent,
        data: {
          title: 'Esplora contenuti'
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
