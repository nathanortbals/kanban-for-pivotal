import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { PivotalApiService } from 'src/app/services/pivotal-api.service';
import { selectSettings } from '../settings/settings.selectors';
import {
  pivotalStoriesLoadFailure,
  pivotalStoriesLoadSuccess,
  updatePivotalStoryState,
  updatePivotalStoryStateFailure,
  updatePivotalStoryStateSuccess,
} from './pivotal-stories.actions';

@Injectable()
export class PivotalStoriesEffects {
  loadPivotalStories$ = createEffect(() =>
    this.store$.select(selectSettings).pipe(
      filter((settings) => settings !== null),
      switchMap((settings) =>
        this.pivotalApiService.getPivotalStoriesFromCurrentIteration(
          settings!.pivotalApiToken,
          settings!.pivotalProjectId!
        )
      ),
      map((pivotalStories) => pivotalStoriesLoadSuccess({ pivotalStories })),
      catchError((error) => of(pivotalStoriesLoadFailure()))
    )
  );

  updatePivotalStoryState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePivotalStoryState),
      withLatestFrom(this.store.select(selectSettings)),
      filter(([_, settings]) => settings !== null),
      concatMap(([{ pivotalStoryId, pivotalStoryState }, settings]) =>
        this.pivotalApiService.updatePivotalStoryState(
          settings!.pivotalApiToken!,
          settings!.pivotalProjectId!,
          pivotalStoryId,
          pivotalStoryState
        )
      ),
      map(() => updatePivotalStoryStateSuccess()),
      catchError(() => of(updatePivotalStoryStateFailure()))
    )
  );

  constructor(
    private store$: Store,
    private actions$: Actions,
    private store: Store,
    private pivotalApiService: PivotalApiService
  ) {}
}
