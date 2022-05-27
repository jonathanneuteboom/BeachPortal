import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speelronde } from '../models/Speelronde';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeelrondeService {
  constructor(private httpClient: HttpClient) {}

  getAllSpeelrondes(): Observable<Speelronde[]> {
    const url = `${environment.apiUrl}/speelronde/all`;
    return this.httpClient.get<Speelronde[]>(url);
  }

  getAlgemeenKlassement(): Observable<any[]> {
    const url = `${environment.apiUrl}/algemeen-klassement`;
    return this.httpClient.get<any[]>(url);
  }

  GetCurrentSpeelronde(): Observable<Speelronde> {
    const url = `${environment.apiUrl}/speelronde/current`;
    return this.httpClient.get<Speelronde>(url);
  }

  AddSpeelronde(): Observable<any> {
    const url = `${environment.apiUrl}/speelronde/add`;
    return this.httpClient.post(url, {});
  }

  DeleteSpeelronde(): Observable<any> {
    const url = `${environment.apiUrl}/speelronde/delete`;
    return this.httpClient.delete(url, {});
  }
}
