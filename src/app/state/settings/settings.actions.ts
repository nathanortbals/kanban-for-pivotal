import { createAction, props } from '@ngrx/store';
import { Settings } from '../../models/settings.model';

export const loadSettings = createAction('[Settings] LOAD_SETTINGS');

export const settingsLoaded = createAction(
  '[Settings] SETTINGS_LOADED',
  props<{ settings: Settings | null }>()
);

export const saveSettings = createAction(
  '[Settings] SAVE_SETTINGS',
  props<{ settings: Settings }>()
);

export const settingsSaved = createAction('[Settings] SETTINGS_SAVED');
