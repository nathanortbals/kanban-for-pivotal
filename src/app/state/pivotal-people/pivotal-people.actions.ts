import { createAction, props } from '@ngrx/store';
import { PivotalPerson } from 'src/app/models/pivotal-person.model';

export const pivotalPeopleLoading = createAction('[Pivotal People] LOADING');

export const pivotalPeopleLoadSuccess = createAction(
  '[Pivotal People] LOAD_SUCCESS',
  props<{ pivotalPeople: PivotalPerson[] }>()
);

export const pivotalPeopleLoadFailure = createAction(
  '[Pivotal People] LOAD_FAILURE'
);
