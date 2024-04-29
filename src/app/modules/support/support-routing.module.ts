import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportAndHelpComponent } from './components/support-and-help/support-and-help.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Impostazioni'
    },
    pathMatch: "prefix",
    component: SupportAndHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
