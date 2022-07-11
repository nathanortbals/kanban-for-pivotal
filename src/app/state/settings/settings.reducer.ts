import { createReducer, on } from '@ngrx/store';
import { saveSettings, settingsLoaded } from './settings.actions';
import { SettingsState } from './settings.state';

export const initialState: SettingsState = {
  pivotalApiToken: '',
  pivotalProjectId: '',
};

export const settingsReducer = createReducer(
  initialState,
  on(settingsLoaded, (state, { settings }) => ({ ...state, ...settings })),
  on(saveSettings, (state, { settings }) => ({ ...state, ...settings }))
);
