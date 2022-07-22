import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import {
  loadSettings,
  saveSettings,
  settingsLoaded,
  settingsSaved,
} from './settings.actions';

@Injectable()
export class SettingsEffects implements OnInitEffects {
  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSettings),
      map(() => {
        const settings = this.settingsService.loadSettings();
        return settingsLoaded({ settings });
      })
    )
  );

  saveSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSettings),
      map(({ settings }) => {
        this.settingsService.saveSettings(settings);
        return settingsSaved();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}

  ngrxOnInitEffects(): Action {
    return loadSettings();
  }
}
