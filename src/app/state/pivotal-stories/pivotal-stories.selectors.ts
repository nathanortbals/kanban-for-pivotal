import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';
import { PivotalStoriesState } from './pivotal-stories.state';

export const selectPivotalStoriesState =
  createFeatureSelector<PivotalStoriesState>('pivotalStories');

export const selectPivotalStoriesByState = (state: PivotalStoryState) =>
  createSelector(selectPivotalStoriesState, (pivotalStoriesState) =>
    pivotalStoriesState.pivotalStories.filter(
      (pivotalStory) => pivotalStory.currentState === state
    )
  );
