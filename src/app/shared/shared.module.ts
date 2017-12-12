import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent, FooterComponent } from './layout';
import {
  ApiService, UserService, JwtService, ProfileService,
  TagsService, ArticleService, ArticleCommentService,
  AuthGuard, NoAuthGuard
} from './services';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './directives';


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
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService, UserService,
        JwtService, ProfileService,
        TagsService, ArticleService,
        ArticleCommentService,
        AuthGuard, NoAuthGuard
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useCLass: ,
        //   multi: true
        // }
      ]
    };
  }
}
