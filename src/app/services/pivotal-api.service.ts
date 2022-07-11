import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PivotalProject } from '../pivotal-project';

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
}
