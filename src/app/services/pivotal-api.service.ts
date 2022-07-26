import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PivotalIteration } from '../models/pivotal-iteration.model';
import { PivotalPerson } from '../models/pivotal-person.model';
import { PivotalProjectMembership } from '../models/pivotal-project-membership.model';
import { PivotalProject } from '../models/pivotal-project.model';
import { PivotalStoryState } from '../models/pivotal-story-state.model';
import { PivotalStory } from '../models/pivotal-story.model';

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

  public getPivotalStoriesFromCurrentIteration(
    pivotalApiToken: string,
    pivotalProjectId: string
  ): Observable<PivotalStory[]> {
    const url = `${this.pivotalApiUrl}/projects/${pivotalProjectId}/iterations`;

    let params = new HttpParams();
    params = params.set('scope', 'current');
    params = params.set('fields', 'stories(:default,before_id,after_id)');

    return this.httpClient
      .get<PivotalIteration[]>(url, {
        params: params,
        headers: { 'X-TrackerToken': pivotalApiToken },
      })
      .pipe(map((iterations) => iterations.at(0)!.stories));
  }

  public getPivotalPeopleForProject(
    pivotalApiToken: string,
    pivotalProjectId: string
  ): Observable<PivotalPerson[]> {
    const url = `${this.pivotalApiUrl}/projects/${pivotalProjectId}/memberships`;

    return this.httpClient
      .get<PivotalProjectMembership[]>(url, {
        headers: { 'X-TrackerToken': pivotalApiToken },
      })
      .pipe(
        map((projectMemberships) =>
          projectMemberships.map(
            (projectMembership) => projectMembership.person
          )
        )
      );
  }

  public updatePivotalStoryState(
    pivotalApiToken: string,
    pivotalProjectId: string,
    pivotalStoryId: number,
    pivotalStoryState: PivotalStoryState
  ): Observable<any> {
    const url = `${this.pivotalApiUrl}/projects/${pivotalProjectId}/stories/${pivotalStoryId}`;

    return this.httpClient.put(
      url,
      {
        current_state: pivotalStoryState,
      },
      {
        headers: { 'X-TrackerToken': pivotalApiToken },
      }
    );
  }
}
