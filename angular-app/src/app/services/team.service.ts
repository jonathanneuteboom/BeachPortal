import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Team[]> {
    const url = `${environment.baseUrl}/team/all`;
    return this.httpClient.get<Team[]>(url);
  }

  getTeam(id: number): Observable<Team> {
    const url = `${environment.baseUrl}/team/${id}`;
    return this.httpClient.get<Team>(url);
  }

  updateTeam(team: Team): Observable<Team> {
    const url = `${environment.baseUrl}/team/update`;
    return this.httpClient.post<Team>(url, team);
  }

  deleteTeam(team: Team): Observable<any> {
    const url = `${environment.baseUrl}/team/${team.id}`;
    return this.httpClient.delete(url);
  }
}
