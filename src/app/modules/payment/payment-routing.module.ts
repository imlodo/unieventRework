import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentStepperComponent } from './components/payment-stepper/payment-stepper.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';

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
