import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ricerca'
    },
    children: [
      {
        path: 'result/:params',
        component: SearchResultComponent,
        data: {
          title: 'Ricerca avanzata'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
