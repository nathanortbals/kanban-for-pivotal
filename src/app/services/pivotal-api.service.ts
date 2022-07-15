import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PivotalIteration } from '../models/pivotal-iteration.model';
import { PivotalProject } from '../models/pivotal-project.model';

@Injectable({
  providedIn: 'root',
})
export class PivotalApiService {
  private readonly pivotalApiUrl = 'https://www.pivotaltracker.com/services/v5';

  constructor(private httpClient: HttpClient) {}

  public testAccess(
    pivotalApiToken: string,
    pivotalProjectId: string
  ): Observable<boolean> {
    const url = `${this.pivotalApiUrl}/projects/${pivotalProjectId}`;

    return this.httpClient
      .get(url, { headers: { 'X-TrackerToken': pivotalApiToken } })
      .pipe(
        map(() => true),
        catchError((_) => of(false))
      );
  }

  public getProject(
    pivotalApiToken: string,
    pivotalProjectId: string
  ): Observable<PivotalProject> {
    const url = `${this.pivotalApiUrl}/projects/${pivotalProjectId}`;

    return this.httpClient.get<PivotalProject>(url, {
      headers: { 'X-TrackerToken': pivotalApiToken },
    });
  }

  public getPivotalIterations(
    pivotalApiToken: string,
    pivotalProjectId: string,
    scope: string
  ): Observable<PivotalIteration[]> {
    const url = `${this.pivotalApiUrl}/projects/${pivotalProjectId}/iterations`;

    const params = new HttpParams().set('scope', scope);

    return this.httpClient.get<PivotalIteration[]>(url, {
      params: params,
      headers: { 'X-TrackerToken': pivotalApiToken },
    });
  }
}
