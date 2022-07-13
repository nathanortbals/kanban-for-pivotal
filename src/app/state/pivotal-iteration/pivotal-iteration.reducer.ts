import { createReducer, on } from '@ngrx/store';
import {
  pivotalIterationLoadFailure,
  pivotalIterationLoadSuccess,
  pivotalIterationsLoading,
} from './pivotal-iteration.actions';
import { PivotalIterationState } from './pivotal-iteration.state';

export const initialState: PivotalIterationState = {
  pivotalIteration: null,
  loadState: 'SUCCESS',
};

export const pivotalIterationReducer = createReducer(
  initialState,
  on(pivotalIterationsLoading, (state) => ({
    ...state,
    loadState: 'LOADING',
  })),
  on(pivotalIterationLoadSuccess, (state, { pivotalIteration }) => ({
    pivotalIteration: pivotalIteration,
    loadState: 'SUCCESS',
  })),
  on(pivotalIterationLoadFailure, (state) => ({
    pivotalIteration: null,
    loadState: 'FAILURE',
  }))
);
