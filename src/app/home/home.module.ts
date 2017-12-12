import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';
import { ArticleModule } from '../articles/article.module';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(HOME_ROUTES),
    ArticleModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: []
})

export class HomeModule { }
