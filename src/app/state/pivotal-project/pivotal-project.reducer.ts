import { createReducer, on } from '@ngrx/store';
import {
  pivotalProjectLoadFailure,
  pivotalProjectLoading,
  pivotalProjectLoadSuccess,
} from './pivotal-project.actions';
import { PivotalProjectState } from './pivotal-project.state';

export const initialState: PivotalProjectState = {
  pivotalProject: null,
  loadState: 'SUCCESS',
};

export const pivotalProjectReducer = createReducer(
  initialState,
  on(pivotalProjectLoading, (state) => ({
    pivotalProject: null,
    loadState: 'LOADING',
  })),
  on(pivotalProjectLoadSuccess, (state, { pivotalProject }) => ({
    pivotalProject: pivotalProject,
    loadState: 'SUCCESS',
  })),
  on(pivotalProjectLoadFailure, (state) => ({
    pivotalProject: null,
    loadState: 'FAILURE',
  }))
);
