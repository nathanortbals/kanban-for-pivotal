import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { Settings } from '../../models/settings.model';
import { SettingsService } from '../../services/settings.service';
import { saveSettings } from '../../state/settings/settings.actions';
import { selectSettings } from '../../state/settings/settings.selectors';

export interface SettingsDialogState {
  pivotalApiToken: string | null;
  pivotalProjectId: string | null;
  testStatus: SettingsDialogTestStatus;
}

export type SettingsDialogTestStatus =
  | 'UNTESTED'
  | 'TESTING'
  | 'SUCCESS'
  | 'FAILURE';

@Injectable()
export class SettingsDialogStore extends ComponentStore<SettingsDialogState> {
  constructor(private settingsService: SettingsService, private store: Store) {
    super({
      pivotalApiToken: null,
      pivotalProjectId: null,
      testStatus: 'UNTESTED',
    });

    this.store.select(selectSettings).subscribe((settings) => {
      if (settings) {
        this.setPivotalApiToken(settings.pivotalApiToken);
        this.setPivotalProjectId(settings.pivotalProjectId);
      }
    });
  }

  // SELECTORS
  readonly pivotalApiToken$ = this.select(
    ({ pivotalApiToken }) => pivotalApiToken
  );

  readonly pivotalProjectId$ = this.select(
    ({ pivotalProjectId }) => pivotalProjectId
  );

  readonly testStatus$ = this.select(({ testStatus }) => testStatus);

  readonly saveEnabled$ = this.select((state) => {
    return (
      state.pivotalApiToken &&
      state.pivotalProjectId &&
      state.testStatus === 'SUCCESS'
    );
  });

  // UPDATERS
  readonly setPivotalApiToken = this.updater((state, value: string | null) => ({
    ...state,
    pivotalApiToken: value,
    testStatus:
      state.pivotalApiToken === state.pivotalProjectId
        ? state.testStatus
        : 'UNTESTED',
  }));

  readonly setPivotalProjectId = this.updater(
    (state, value: string | null) => ({
      ...state,
      pivotalProjectId: value,
      testStatus:
        state.pivotalProjectId === state.pivotalProjectId
          ? state.testStatus
          : 'UNTESTED',
    })
  );

  readonly testSettings = this.updater((state) => ({
    ...state,
    testStatus: 'TESTING',
  }));

  private readonly setTestStatus = this.updater(
    (state, value: SettingsDialogTestStatus) => ({
      ...state,
      testStatus: value,
    })
  );

  readonly saveSettings = () => {
    const pivotalApiToken = this.get((settings) => settings.pivotalApiToken);
    const pivotalProjectId = this.get((settings) => settings.pivotalProjectId);

    if (pivotalApiToken && pivotalProjectId) {
      this.store.dispatch(
        saveSettings({ settings: { pivotalApiToken, pivotalProjectId } })
      );
    }
  };

  // EFFECTS
  private readonly testSettingsEffect = this.effect(() => {
    return this.state$.pipe(
      filter((state) => state.testStatus === 'TESTING'),
      map((state) => ({ ...state } as Settings)),
      switchMap((settingsState) =>
        this.settingsService.testSettings(settingsState)
      ),
      map((success) => (success ? 'SUCCESS' : 'FAILURE')),
      tap((status) => this.setTestStatus(status)),
      catchError(() => of('FAILURE'))
    );
  });
}
