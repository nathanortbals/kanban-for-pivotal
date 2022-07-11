import { createAction, props } from '@ngrx/store';
import { SettingsState } from './settings.state';

export const loadSettings = createAction('[Settings] LOAD_SETTINGS');

export const settingsLoaded = createAction(
  '[Settings] SETTINGS_LOADED',
  props<{ settings: SettingsState }>()
);

export const saveSettings = createAction(
  '[Settings] SAVE_SETTINGS',
  props<{ settings: SettingsState }>()
);

export const settingsSaved = createAction('[Settings] SETTINGS_SAVED');
