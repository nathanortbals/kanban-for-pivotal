import { createReducer, on } from '@ngrx/store';
import {
  pivotalStoriesLoadFailure,
  pivotalStoriesLoading,
  pivotalStoriesLoadSuccess,
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
  }))
);
