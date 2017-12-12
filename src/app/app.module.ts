import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './articles/article.module';
// import { EditorModule } from './editor/editor.module';
// import { SettingsModule } from './settings/settings.module';

import {
  SharedModule,
//   ArticlesService, AuthGuard,
//   CommentsService, FooterComponent, HeaderComponent,
//   JwtService, ProfilesService,
//   TagsService, UserService
} from './shared';
import { CoreModule } from './core';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    CoreModule,
    AuthModule,
    HomeModule,
    ProfileModule,
    ArticleModule,
    // SettingsModule,
    // EditorModule,
  ],
  declarations: [
    AppComponent,
    // FooterComponent,
    // HeaderComponent
  ],
  providers: [
    // ApiService,
    // UserService
    // ArticlesService,
    // AuthGuard,
    // CommentsService,
    // JwtService,
    // ProfilesService,
    // TagsService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
