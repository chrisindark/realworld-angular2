import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JwtService } from './shared/services/jwt.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.jwtService.getToken('AuthObject')) {
      return next.handle(req);
    }

    const modified = req.clone({
      setHeaders: {
        'Authorization': this.getAuthHeader()
      }
    });
    return next.handle(modified);
  }

  getAuthHeader = function () {
    const jwtToken = this.jwtService.getToken('jwtToken');
    if (jwtToken) {
      return `Token ${jwtToken}`;
    } else {
      return undefined;
    }
  };

}
