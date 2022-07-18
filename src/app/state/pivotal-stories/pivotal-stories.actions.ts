import { createAction, props } from '@ngrx/store';
import { PivotalStory } from 'src/app/models/pivotal-story.model';

export const pivotalStoriesLoading = createAction('[Pivotal Stories] LOADING');

export const pivotalStoriesLoadSuccess = createAction(
  '[Pivotal Stories] LOAD_SUCCESS',
  props<{ pivotalStories: PivotalStory[] }>()
);

export const pivotalStoriesLoadFailure = createAction(
  '[Pivotal Stories] LOAD_FAILURE'
);
