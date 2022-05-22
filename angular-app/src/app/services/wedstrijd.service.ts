import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wedstrijd } from '../models/Wedstrijd';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WedstrijdService {
  constructor(private httpClient: HttpClient) {}

  uitslagInvoeren(wedstrijd: Wedstrijd): Observable<any> {
    const url = `${environment.baseUrl}/wedstrijd/${wedstrijd.id}`;
    return this.httpClient.put(url, wedstrijd);
  }
}
