import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalProjectState } from './pivotal-project.state';

export const selectPivotalProjectState =
  createFeatureSelector<PivotalProjectState>('pivotalProject');

export const selectPivotalProjectName = createSelector(
  selectPivotalProjectState,
  (pivotalProjectState) => pivotalProjectState.pivotalProject?.name
);
