import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HTTPResponseCodeInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event) => {},
        (error) => {
          if (error.status === 401) {
            this.userService.setUnauthorized();
          }
        }
      )
    );
  }
}
