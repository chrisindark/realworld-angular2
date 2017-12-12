import { Routes } from '@angular/router';

import { ArticleComponent} from './article.component';
import { ArticleResolver } from './article-resolver.service';


export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver
    }
  }
];
