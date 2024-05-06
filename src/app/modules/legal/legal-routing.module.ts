import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DataProcessingComponent } from './components/data-processing/data-processing.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Regolamenti'
    },
    children: [
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy'
        }
      },
      {
        path: 'data-processing',
        component: DataProcessingComponent,
        data: {
          title: 'Trattamento dei dati'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
