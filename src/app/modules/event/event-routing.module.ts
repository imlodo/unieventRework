import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { EventTicketListComponent } from './components/event-ticket-list/event-ticket-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Evento'
        },
        children: [
            {
                path: '',
                component: EventPageComponent
            },
            {
                path: 'detail/:params',
                component: EventDetailComponent,
                data: {
                    title: 'Dettaglio Evento'
                }
            },
            {
                path: 'ticket/list/:params',
                component: EventTicketListComponent,
                data: {
                    title: 'Dettaglio Evento'
                }
            },
            {
                path: 'create',
                component: EventCreateComponent,
                data: {
                    title: 'Dettaglio Evento'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }
