import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PivotalPeopleState } from './pivotal-people.state';

export const selectPivotalPeopleState =
  createFeatureSelector<PivotalPeopleState>('pivotalPeople');

export const selectPivotalPeopleByIds = (ids: number[]) =>
  createSelector(selectPivotalPeopleState, (pivotalPeopleState) =>
    pivotalPeopleState.pivotalPeople.filter((person) => ids.includes(person.id))
  );
