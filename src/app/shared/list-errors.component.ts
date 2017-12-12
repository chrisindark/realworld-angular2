import { Component, Input } from '@angular/core';

import { Errors } from './models';


@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})

export class ListErrorsComponent {
  formattedErrors: Array<any> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];

    if (errorList.errors) {
      for (const key in errorList.errors) {
        this.formattedErrors.push(`${key} ${errorList.errors[key]}`);
      }
    }
  }

  get errorList() {
    return this.formattedErrors;
  }

}
