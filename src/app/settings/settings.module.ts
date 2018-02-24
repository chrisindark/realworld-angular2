import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { AuthGuard, SharedModule } from '../shared';
import { SETTINGS_ROUTES } from './settings.routes';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(SETTINGS_ROUTES),
  ],
  declarations: [
    SettingsComponent
  ]
})

export class SettingsModule { }
