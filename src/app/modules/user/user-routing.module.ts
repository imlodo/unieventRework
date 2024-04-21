import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    pathMatch: 'full',
    data: {
      title: 'Profilo Utente'
    }
  },
  {
    path: ':params',
    component: UserProfileComponent,
    pathMatch: 'full',
    data: {
      title: 'Profilo Utente'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
