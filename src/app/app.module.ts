import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './app.http-interceptor';

import { SharedModule } from './shared';
import { CoreModule } from './core';

import { AuthModule } from './auth';
import { HomeModule } from './home';
import { ProfileModule } from './profile';
import { ArticleModule } from './articles';
import { SettingsModule } from './settings';
import { EditorModule } from './editor';


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
    SettingsModule,
    EditorModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
