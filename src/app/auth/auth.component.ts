import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../shared';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit, OnDestroy {
  authType: String = '';
  submitText: String = '';
  errors: Errors = new Errors();
  isSubmitting: boolean;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Gives you the string path from root to current route. i.e /Root/CurrentRoute
    // console.log(this.router.url.split('/'));

    const currentRoute = this.router.url.split('/');
    // Get the last piece of the URL (it's either 'login' or 'register')
    this.authType = currentRoute[currentRoute.length - 1];
    // Set a title for the page accordingly
    this.submitText = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    // add form control for username if this is the register page
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl());
    }
  }

  ngOnDestroy() {}

  submitForm() {
    this.isSubmitting = true;
    // this.errors = new Errors();

    const credentials = this.authForm.value;

    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.router.navigateByUrl('/');
        }, error => {
          this.errors = error.error;
          this.isSubmitting = false;
        });
  }

}
