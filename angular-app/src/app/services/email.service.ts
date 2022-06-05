import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) {}

  EmailVersturen(mail): Observable<any> {
    const url = `${environment.apiUrl}/email/send`;
    return this.httpClient.post(url, mail);
  }
}
