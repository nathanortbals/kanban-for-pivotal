import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';
import { PivotalIterationState } from './pivotal-iteration.state';

export const selectPivotalIterationState =
  createFeatureSelector<PivotalIterationState>('pivotalStories');

export const selectPivotalStoriesFromIteration = createSelector(
  selectPivotalIterationState,
  (pivotalStoriesState) => pivotalStoriesState.pivotalIteration?.stories
);

export const selectPivotalStoriesFromIterationByState = (
  state: PivotalStoryState
) =>
  createSelector(selectPivotalStoriesFromIteration, (pivotalStories) =>
    pivotalStories?.filter(
      (pivotalStory) => pivotalStory.currentState === state
    )
  );
