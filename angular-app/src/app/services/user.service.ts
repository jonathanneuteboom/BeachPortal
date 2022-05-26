import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speler } from '../models/Speler';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
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
    return this.httpClient.post(`${environment.baseUrl}/user/login`, {
      username,
      password
    }).pipe(tap(data => {
      localStorage.setItem('authentication-token', data.token);
    }))
  }

  logout(): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/user/logout`, {}).pipe(tap(data => {
      localStorage.removeItem('authentication-token');
    }))
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.baseUrl}/user/current`);
  }

  getUsersWithName(naam: string): Observable<Speler[]> {
    const url = `${environment.baseUrl}/user/find-by-name`;
    const params = { params: { naam } };
    return this.httpClient.get<Speler[]>(url, params);
  }
}
