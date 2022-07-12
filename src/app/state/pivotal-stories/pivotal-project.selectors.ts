import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalStoriesState } from './pivotal-stories.state';

export const selectPivotalStoriesState =
  createFeatureSelector<PivotalStoriesState>('pivotalStories');

export const selectPivotalStories = createSelector(
  selectPivotalStoriesState,
  (pivotalStoriesState) => pivotalStoriesState.pivotalStories
);
