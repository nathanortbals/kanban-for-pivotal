import { createReducer, on } from '@ngrx/store';
import { saveSettings, settingsLoaded } from './settings.actions';
import { SettingsState } from './settings.state';

export const initialState: SettingsState = {
  settings: null,
  loadState: 'LOADING',
};

export const settingsReducer = createReducer(
  initialState,
  on(settingsLoaded, (state, { settings }) => ({
    settings: settings,
    loadState: 'SUCCESS',
  })),
  on(saveSettings, (state, { settings }) => ({
    settings: settings,
    loadState: 'SUCCESS',
  }))
);
