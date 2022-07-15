import { createAction, props } from '@ngrx/store';
import { PivotalIteration } from 'src/app/models/pivotal-iteration.model';

export const pivotalIterationsLoading = createAction(
  '[Pivotal Iteration] LOADING'
);

export const pivotalIterationLoadSuccess = createAction(
  '[Pivotal Iteration] LOAD_SUCCESS',
  props<{ pivotalIteration: PivotalIteration }>()
);

export const pivotalIterationLoadFailure = createAction(
  '[Pivotal Iteration] LOAD_FAILURE'
);
