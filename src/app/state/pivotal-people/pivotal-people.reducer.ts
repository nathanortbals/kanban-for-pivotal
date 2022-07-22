import { createReducer, on } from '@ngrx/store';
import {
  pivotalPeopleLoadFailure,
  pivotalPeopleLoading,
  pivotalPeopleLoadSuccess,
} from './pivotal-people.actions';
import { PivotalPeopleState } from './pivotal-people.state';

export const initialState: PivotalPeopleState = {
  pivotalPeople: [],
  loadState: 'SUCCESS',
};

export const pivotalPeopleReducer = createReducer(
  initialState,
  on(pivotalPeopleLoading, (state) => ({
    pivotalPeople: [],
    loadState: 'LOADING',
  })),
  on(pivotalPeopleLoadSuccess, (state, { pivotalPeople }) => ({
    pivotalPeople: pivotalPeople,
    loadState: 'SUCCESS',
  })),
  on(pivotalPeopleLoadFailure, (state) => ({
    pivotalPeople: [],
    loadState: 'FAILURE',
  }))
);
