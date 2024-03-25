import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ricerca'
    },
    children: [
      {
        path: '',
        component: TicketListComponent,
        data: {
          title: 'Lista ticket'
        }
      },
      {
        path: ':params',
        component: TicketDetailComponent,
        data: {
          title: 'Dettaglio ticket'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
