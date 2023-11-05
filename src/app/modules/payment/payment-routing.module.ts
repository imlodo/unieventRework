import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentStepperComponent, PaymentDetailComponent, PaymentOverviewComponent } from './';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pagamenti'
    },
    children: [
      {
        path: 'checkout/:params',
        component: PaymentStepperComponent,
        data: {
          title: 'Pagamento'
        }
      },
      {
        path: 'overview/:params',
        component: PaymentOverviewComponent,
        data: {
          title: 'Pagamento'
        }
      },
      {
        path: 'detail/:params',
        component: PaymentDetailComponent,
        data: {
          title: 'Dettaglio Pagamenti'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
