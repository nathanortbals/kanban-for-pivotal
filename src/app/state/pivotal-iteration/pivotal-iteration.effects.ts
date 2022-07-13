import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { PivotalApiService } from 'src/app/services/pivotal-api.service';
import { pivotalProjectLoadFailure } from '../pivotal-project/pivotal-project.actions';
import { selectSettings } from '../settings/settings.selectors';
import {
  pivotalIterationLoadFailure,
  pivotalIterationLoadSuccess,
} from './pivotal-iteration.actions';

@Injectable()
export class PivotalIterationEffects {
  loadPivotalStories$ = createEffect(() =>
    this.store$.select(selectSettings).pipe(
      filter(
        (settings) =>
          settings.pivotalApiToken != undefined &&
          settings.pivotalProjectId != undefined
      ),
      distinctUntilChanged(
        (settings, otherSettings) =>
          settings.pivotalApiToken === otherSettings.pivotalApiToken &&
          settings.pivotalProjectId === otherSettings.pivotalProjectId
      ),
      switchMap((settings) => {
        return this.pivotalApiService.getPivotalIterations(
          settings.pivotalApiToken!,
          settings.pivotalProjectId!,
          'current'
        );
      }),
      map((pivotalIterations) => {
        console.log(pivotalIterations);
        const pivotalIteration = pivotalIterations.at(0);

        if (pivotalIteration) {
          return pivotalIterationLoadSuccess({ pivotalIteration });
        }

        return pivotalProjectLoadFailure();
      }),
      catchError((error) => {
        console.log(error);
        return of(pivotalIterationLoadFailure());
      })
    )
  );

  constructor(
    private store$: Store,
    private pivotalApiService: PivotalApiService
  ) {}
}
