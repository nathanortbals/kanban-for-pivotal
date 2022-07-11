import { createAction, props } from '@ngrx/store';
import { PivotalProject } from '../../models/pivotal-project.model';

export const pivotalProjectLoading = createAction('[Pivotal Project] LOADING');

export const pivotalProjectLoadSuccess = createAction(
  '[Pivotal Project] LOAD_SUCCESS',
  props<{ pivotalProject: PivotalProject }>()
);

export const pivotalProjectLoadFailure = createAction(
  '[Pivotal Project] LOAD_FAILURE'
);
