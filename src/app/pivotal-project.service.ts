import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { PivotalApiService } from './pivotal-api.service';
import { PivotalProject } from './pivotal-project';
import { RefreshService } from './refresh.service';
import { SettingsService } from './settings.service';
import { filterNullOrUndefined } from './utils/filter-null-or-undefined-operator';

@Injectable({
  providedIn: 'root',
})
export class PivotalProjectService {
  public readonly pivotalProject$: Observable<PivotalProject>;

  constructor(
    private settingService: SettingsService,
    private pivotalApiService: PivotalApiService,
    private refreshService: RefreshService
  ) {
    this.pivotalProject$ = combineLatest([
      this.settingService.settings$,
      this.refreshService.refresh$,
    ]).pipe(
      map(([settings, _]) => settings),
      filterNullOrUndefined(),
      switchMap((settings) =>
        this.pivotalApiService.getProject(
          settings.pivotalApiToken,
          settings.pivotalProjectId
        )
      )
    );
  }
}
