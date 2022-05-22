import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private httpClient: HttpClient) {}

  getDocument(): Observable<any> {
    const url = `${environment.baseUrl}/algemene-informatie`;
    return this.httpClient.get(url);
  }

  updateDocument(content: string): Observable<any> {
    const url = `${environment.baseUrl}/algemene-informatie`;
    return this.httpClient.post(url, { content });
  }
}
