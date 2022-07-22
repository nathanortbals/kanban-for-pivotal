import { createReducer, on } from '@ngrx/store';
import {
  pivotalStoriesLoadFailure,
  pivotalStoriesLoading,
  pivotalStoriesLoadSuccess,
  updatePivotalStoryState,
} from './pivotal-stories.actions';
import { PivotalStoriesState } from './pivotal-stories.state';

export const initialState: PivotalStoriesState = {
  pivotalStories: [],
  loadState: 'SUCCESS',
};

export const pivotalStoriesReducer = createReducer(
  initialState,
  on(pivotalStoriesLoading, (state) => ({
    ...state,
    loadState: 'LOADING',
  })),
  on(pivotalStoriesLoadSuccess, (state, { pivotalStories }) => ({
    pivotalStories: pivotalStories,
    loadState: 'SUCCESS',
  })),
  on(pivotalStoriesLoadFailure, (state) => ({
    pivotalStories: [],
    loadState: 'FAILURE',
  })),
  on(
    updatePivotalStoryState,
    (state, { pivotalStoryId, pivotalStoryState }) => ({
      ...state,
      pivotalStories: state.pivotalStories.map((pivotalStory) =>
        pivotalStory.id === pivotalStoryId
          ? { ...pivotalStory, currentState: pivotalStoryState }
          : pivotalStory
      ),
    })
  )
);
