import { Routes } from '@angular/router';

import { EditorComponent } from './editor.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { EditableArticleResolver } from './editable-article-resolver.service';

export const EDITOR_ROUTES: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  }
];
