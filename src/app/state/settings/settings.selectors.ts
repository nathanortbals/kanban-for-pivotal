import { createFeatureSelector } from '@ngrx/store';
import { SettingsState } from './settings.state';

export const selectSettings = createFeatureSelector<SettingsState>('settings');
