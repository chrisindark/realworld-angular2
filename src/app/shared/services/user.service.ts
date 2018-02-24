import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private authObjectKey = 'AuthObject';
  private jwtKey = 'jwtToken';

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  // Verify JWT is in localstorage & load user's info else show default view.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken(this.jwtKey)) {
      this.apiService.get('/users')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.setToken(user.token, this.jwtKey);
    this.jwtService.setToken(user, this.authObjectKey);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.removeToken(this.jwtKey);
    this.jwtService.removeToken(this.authObjectKey);
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<any> {
    const route = (type === 'login') ? '/login/' : '';
    return this.apiService.post('/users' + route, credentials)
      .map(data => {
        this.setAuth(data.user);
        return data;
      });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/users', user)
      .map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

}
