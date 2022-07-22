import { createReducer, on } from '@ngrx/store';
import { Settings } from '../../models/settings.model';
import { saveSettings, settingsLoaded } from './settings.actions';

export const initialState: Settings = {
  pivotalApiToken: null,
  pivotalProjectId: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(settingsLoaded, (state, { settings }) => ({ ...state, ...settings })),
  on(saveSettings, (state, { settings }) => ({ ...state, ...settings }))
);
