import { createReducer, on } from '@ngrx/store';
import { Settings } from '../../models/settings.state.model';
import { saveSettings, settingsLoaded } from './settings.actions';

export const initialState: Settings = {
  pivotalApiToken: '',
  pivotalProjectId: '',
};

export const settingsReducer = createReducer(
  initialState,
  on(settingsLoaded, (state, { settings }) => ({ ...state, ...settings })),
  on(saveSettings, (state, { settings }) => ({ ...state, ...settings }))
);
