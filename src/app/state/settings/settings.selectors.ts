import { createFeatureSelector } from '@ngrx/store';
import { Settings } from '../../models/settings.state.model';

export const selectSettings = createFeatureSelector<Settings>('settings');
