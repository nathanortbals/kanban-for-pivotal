import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SettingsState } from '../state/settings/settings.state';
import { PivotalApiService } from './pivotal-api.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private pivotalApiService: PivotalApiService) {}

  public loadSettings(): SettingsState {
    const pivotalApiToken =
      localStorage.getItem('pivotalApiToken') ?? undefined;
    const pivotalProjectId =
      localStorage.getItem('pivotalProjectId') ?? undefined;

    return {
      pivotalApiToken,
      pivotalProjectId,
    };
  }

  public testSettings(settings: SettingsState): Observable<boolean> {
    if (!settings.pivotalApiToken || !settings.pivotalProjectId) {
      return of(false);
    }

    return this.pivotalApiService
      .getProject(settings.pivotalApiToken, settings.pivotalProjectId)
      .pipe(
        map(() => true),
        catchError((_) => of(false))
      );
  }

  public saveSettings(settings: SettingsState) {
    if (settings.pivotalApiToken) {
      localStorage.setItem('pivotalApiToken', settings.pivotalApiToken);
    }

    if (settings.pivotalProjectId) {
      localStorage.setItem('pivotalProjectId', settings.pivotalProjectId);
    }
  }
}
