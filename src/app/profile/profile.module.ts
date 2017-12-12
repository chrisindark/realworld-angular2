import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { PROFILE_ROUTES } from './profile.routes';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(PROFILE_ROUTES)
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [ProfileResolver]
})

export class ProfileModule { }
