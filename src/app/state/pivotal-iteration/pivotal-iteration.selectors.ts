import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalIterationState } from './pivotal-iteration.state';

export const selectPivotalIterationState =
  createFeatureSelector<PivotalIterationState>('pivotalStories');

export const selectPivotalStoriesFromIteration = createSelector(
  selectPivotalIterationState,
  (pivotalStoriesState) => pivotalStoriesState.pivotalIteration?.stories
);
