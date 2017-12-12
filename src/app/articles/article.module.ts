import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { ArticleComponent } from './article.component';
import { ArticleCommentComponent } from './article-comment.component';
import { ArticleListComponent } from './article-list.component';
import { ArticlePreviewComponent } from './article-preview.component';
import { ArticleResolver } from './article-resolver.service';
// import { MarkdownPipe } from './markdown.pipe';
import { ARTICLE_ROUTES } from './article.routes';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(ARTICLE_ROUTES)
  ],
  declarations: [
    ArticleComponent,
    ArticleCommentComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    // MarkdownPipe.
  ],
  providers: [ArticleResolver],
  exports: [
    ArticleComponent,
    ArticleCommentComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
  ]
})

export class ArticleModule {}
