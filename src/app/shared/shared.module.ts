import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent, FooterComponent } from './layout';
import {
  ApiService,
  UserService,
  JwtService,
  ProfileService,
  TagsService,
  ArticleService,
  ArticleCommentService,
  AuthGuard,
  NoAuthGuard
} from './services';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './directives';
import { PaginationComponent } from './layout/pagination/pagination.component';
import { MarkdownPipe } from './pipes/markdown.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    FavoriteButtonComponent,
    FollowButtonComponent,
    PaginationComponent,
    MarkdownPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    FavoriteButtonComponent,
    FollowButtonComponent,
    PaginationComponent,
    MarkdownPipe,
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        UserService,
        JwtService,
        ProfileService,
        TagsService,
        ArticleService,
        ArticleCommentService,
        AuthGuard,
        NoAuthGuard
      ]
    };
  }
}
