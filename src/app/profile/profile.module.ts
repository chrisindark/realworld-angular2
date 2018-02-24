import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { ArticleModule } from '../articles';
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';
import { ProfileResolver } from './profile-resolver.service';
import { PROFILE_ROUTES } from './profile.routes';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    ArticleModule,
    RouterModule.forChild(PROFILE_ROUTES)
  ],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
  ],
  providers: [ProfileResolver]
})

export class ProfileModule { }
