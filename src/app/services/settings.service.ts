import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Settings } from '../models/settings.model';
import { PivotalApiService } from './pivotal-api.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly localStorageKey = 'pivotal-kanban-settings-storage';

  constructor(private pivotalApiService: PivotalApiService) {}

  public loadSettings(): Settings {
    const pivotalKanbanSettings = localStorage.getItem(this.localStorageKey);

    if (!pivotalKanbanSettings) {
      return {};
    }

    return JSON.parse(pivotalKanbanSettings) as Settings;
  }

  public testSettings(settings: Settings): Observable<boolean> {
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

  public saveSettings(settings: Settings) {
    const json = JSON.stringify(settings);

    localStorage.setItem(this.localStorageKey, json);
  }
}
