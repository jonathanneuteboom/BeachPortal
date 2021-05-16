import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) {}

  ProgrammaVersturen(): Observable<any> {
    const url = `${environment.baseUrl}/email/programma-versturen`;
    return this.httpClient.post(url, {});
  }
}
