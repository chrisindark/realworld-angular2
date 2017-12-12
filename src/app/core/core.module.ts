import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LoadingComponent } from './loading.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoadingComponent,
  ],
  providers: [
    Title,
    DatePipe,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
  ]
})

export class CoreModule { }
