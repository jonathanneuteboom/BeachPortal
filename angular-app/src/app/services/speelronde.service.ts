import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speelronde } from '../models/Speelronde';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeelrondeService {
  constructor(private httpClient: HttpClient) {}

  getAllSpeelrondes(): Observable<Speelronde[]> {
    const url = `${environment.baseUrl}/speelronde/all`;
    return this.httpClient.get<Speelronde[]>(url);
  }

  GetCurrentSpeelronde(): Observable<Speelronde> {
    const url = `${environment.baseUrl}/speelronde/current`;
    return this.httpClient.get<Speelronde>(url);
  }

  AddSpeelronde(): Observable<any> {
    const url = `${environment.baseUrl}/speelronde/add`;
    return this.httpClient.post(url, {});
  }

  DeleteSpeelronde(): Observable<any> {
    const url = `${environment.baseUrl}/speelronde/delete`;
    return this.httpClient.delete(url, {});
  }
}
