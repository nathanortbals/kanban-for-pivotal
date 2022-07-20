import { createAction, props } from '@ngrx/store';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';
import { PivotalStory } from 'src/app/models/pivotal-story.model';

export const pivotalStoriesLoading = createAction('[Pivotal Stories] LOADING');

export const pivotalStoriesLoadSuccess = createAction(
  '[Pivotal Stories] LOAD_SUCCESS',
  props<{ pivotalStories: PivotalStory[] }>()
);

export const pivotalStoriesLoadFailure = createAction(
  '[Pivotal Stories] LOAD_FAILURE'
);

export const updatePivotalStoryState = createAction(
  '[Pivotal Stories] UPDATE_STATE',
  props<{
    pivotalStoryId: number;
    pivotalStoryState: PivotalStoryState;
  }>()
);

export const updatePivotalStoryStateSuccess = createAction(
  '[Pivotal Stories] UPDATE_STATE_SUCCESS'
);

export const updatePivotalStoryStateFailure = createAction(
  '[Pivotal Stories] UPDATE_STATE_FAILURE'
);
