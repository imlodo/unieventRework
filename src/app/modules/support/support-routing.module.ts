import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportAndHelpComponent } from './components/support-and-help/support-and-help.component';
import { SupportTicketDetailComponent } from './components/support-ticket-detail/support-ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Impostazioni'
    },
    children: [
      {
        path: '',
        component: SupportAndHelpComponent
      },
      {
        path: "detail/:params",
        component: SupportTicketDetailComponent
      },
      {
        path: ":params",
        component: SupportAndHelpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
