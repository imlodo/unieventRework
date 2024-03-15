import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentDetailComponent } from './compontents/content-detail/content-detail.component';

const routes: Routes = [
    {
        path: ':params',
        component: ContentDetailComponent,
        pathMatch: 'full',
        data: {
            title: 'Dettaglio Contenuto'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }
