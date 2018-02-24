import { Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { AuthGuard, SharedModule } from '../shared';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [ AuthGuard ]
  }
];
