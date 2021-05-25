import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HTTPResponseCodeInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private snackbarService: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const editTypes = ['POST', 'PUT', 'DELETE'];
    const isEditRequest =
      editTypes.findIndex((type) => type === request.method) !== -1;

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (isEditRequest && event.type === HttpEventType.Response) {
            this.snackbarService.open('Succesvol aangepast', '✅');
          }
        },
        (error) => {
          if (error.status === 401) {
            this.userService.setUnauthorized();
          }
          if (error.status === 500) {
            this.snackbarService.open(error.error.message, '❌');
          }
        }
      )
    );
  }
}
