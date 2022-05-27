import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speler } from '../models/Speler';
import { User } from '../models/User';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  unauthorized = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  userId?: number
  token?: string
  username?: string

  setUnauthorized(): void {
    this.unauthorized.emit(true);
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/login`, {
      username,
      password
    }).pipe(tap(data => {
      localStorage.setItem('authentication-token', data.token);
    }))
  }

  logout(): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/logout`, {}).pipe(tap(data => {
      localStorage.removeItem('authentication-token');
    }))
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/user/current`);
  }

  getUsersWithName(naam: string): Observable<Speler[]> {
    const url = `${environment.apiUrl}/user/find-by-name`;
    const params = { params: { naam } };
    return this.httpClient.get<Speler[]>(url, params);
  }

  forgotEmail(email: string):Observable<any> {
    const url = `${environment.apiUrl}/password_reset/`
    return this.httpClient.post(url, { email })
  }

  resetPassword(token: string, password: string) :Observable<any> {
    const url = `${environment.apiUrl}/password_reset/confirm/`
    return this.httpClient.post(url, { token, password })
  }
}
