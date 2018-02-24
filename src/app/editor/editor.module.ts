import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { CoreModule } from '../core/core.module';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { EDITOR_ROUTES } from './editor.routes';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(EDITOR_ROUTES)
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolver
  ]
})

export class EditorModule {}
