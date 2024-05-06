import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CoreModule } from 'src/app/core/core.module';
import { ContentRoutingModule } from './content-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContentDetailComponent } from './compontents/content-detail/content-detail.component';
import { MessageEmoticonPanelComponent } from '../message/components/message-emoticon-panel/message-emoticon-panel.component';
import { MessageModule } from '../message/message.module';
import { ContentCreateComponent } from './compontents/content-create/content-create.component';

@NgModule({
  declarations: [
    ContentDetailComponent,
    ContentCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MessageModule,
    ContentRoutingModule,
    CoreModule
  ],
  exports: [
  ],
  providers: [
  ],
  id: 'Event'
})
export class ContentModule {
  static forRoot() {
    return {
      ngModule: ContentModule,
      providers: [],
    };
  }
}
