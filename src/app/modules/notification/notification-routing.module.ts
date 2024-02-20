import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotFoundComponent } from 'src/app/core/components';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: NotFoundComponent,
                data: {
                    title: 'Homepage',
                },
            },
        ],
        data: {
            title: 'Notifiche',
        },
    },
    {
        path: '',
        children: [
            {
                path: 'list',
                component: NotificationListComponent,
                data: {
                    title: 'Lista Notifiche'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationRoutingModule { }
