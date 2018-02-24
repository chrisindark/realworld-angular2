import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaderResponse, HttpErrorResponse,
  HttpHeaders, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';


@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${environment.api_url}${path}`, {
        headers: this.setHeaders(),
        params: params
      })
      .catch(this.formatErrors);
  }

  put(path: string, data: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`, data, {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors);
  }

  patch(path: string, data: Object = {}): Observable<any> {
    return this.http.patch(
      `${environment.api_url}${path}`, data, {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors);
  }

  post(path: string, data: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`, data, {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors);
  }

  remove(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`, {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors);
  }


  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: HttpErrorResponse) {
    console.log(error);
    return Observable.throw(error);
  }

}
