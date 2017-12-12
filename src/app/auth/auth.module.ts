import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';


@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(AUTH_ROUTES)
  ],
  declarations: [
    AuthComponent
  ],
  providers: []
})

export class AuthModule { }
