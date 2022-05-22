import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poule } from '../models/Poule';
import { Team } from '../models/Team';
import { environment } from 'src/environments/environment';
import { Speellocatie } from '../models/Speellocatie';
import { OverlapItem } from '../models/OverlapItem';

@Injectable({
  providedIn: 'root'
})
export class PouleService {
  constructor(private httpClient: HttpClient) {}

  addPoule(poule: Poule): Observable<any> {
    const url = `${environment.baseUrl}/poule`;
    return this.httpClient.post(url, poule);
  }

  addTeamToPoule(poule: Poule, team: Team): Observable<any> {
    const url = `${environment.baseUrl}/poule/${poule.id}/team/${team.id}`;
    return this.httpClient.post(url, {});
  }

  updatePoule(poule: Poule): Observable<any> {
    const url = `${environment.baseUrl}/poule/${poule.id}/`;
    return this.httpClient.put(url, {
      speeltijd: poule.speeltijd,
      speellocatieId: poule.speellocatie.id
    });
  }

  deleteTeamFromPoule(poule: Poule, team: Team): Observable<any> {
    const url = `${environment.baseUrl}/poule/${poule.id}/team/${team.id}`;
    return this.httpClient.delete(url);
  }

  getAllPoules(): Observable<Poule[]> {
    const url = `${environment.baseUrl}/poule/all`;
    return this.httpClient.get<Poule[]>(url);
  }

  getAllSpeellocaties() : Observable<Speellocatie[]> {
    const url = `${environment.baseUrl}/speellocaties`;
    return this.httpClient.get<Speellocatie[]>(url);
  }

  getOverlappingPlayers() : Observable<OverlapItem[]> {
    const url = `${environment.baseUrl}/poule/overlap`;
    return this.httpClient.get<OverlapItem[]>(url);
  }

  importeerSkc(): Observable<any> {
    const url = `${environment.baseUrl}/management/importeer-skc`;
    return this.httpClient.post(url, {});
  }

  getMyPoules(): Observable<Poule[]> {
    const url = `${environment.baseUrl}/poule/my`;
    return this.httpClient.get<Poule[]>(url);
  }

  deletePoule(poule: Poule): Observable<any> {
    const url = `${environment.baseUrl}/poule/${poule.id}`;
    return this.httpClient.delete(url);
  }
}
