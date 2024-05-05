import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistVerifyComponent } from './components/artist-verify/artist-verify.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pagamenti'
    },
    children: [
      {
        path: 'verify',
        component: ArtistVerifyComponent,
        data: {
          title: 'Pagamento'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
