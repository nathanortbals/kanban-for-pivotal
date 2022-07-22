import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from './settings.state';

export const selectSettingsState =
  createFeatureSelector<SettingsState>('settings');

export const selectSettings = createSelector(
  selectSettingsState,
  (settingsState) => settingsState.settings
);
