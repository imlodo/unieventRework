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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageModule } from '../message/message.module';
import { ContentCreateComponent } from './compontents/content-create/content-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from './services/file-upload-service/file-upload-service';

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
    CoreModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    FileUploadService
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
