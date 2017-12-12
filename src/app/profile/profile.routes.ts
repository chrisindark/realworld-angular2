import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';


export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ':username'
  },
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: []
  }
];
