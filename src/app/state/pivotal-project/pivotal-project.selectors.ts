import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalProjectState } from './pivotal-project.state';

export const selectPivotalProjectState =
  createFeatureSelector<PivotalProjectState>('pivotalProject');

export const selectPivotalProject = createSelector(
  selectPivotalProjectState,
  (pivotalProjectState) => pivotalProjectState.pivotalProject
);

export const selectPivotalProjectName = createSelector(
  selectPivotalProject,
  (pivotalProject) => pivotalProject?.name
);
