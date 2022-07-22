import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { PivotalApiService } from 'src/app/services/pivotal-api.service';
import { selectSettings } from '../settings/settings.selectors';
import {
  pivotalProjectLoadFailure,
  pivotalProjectLoadSuccess,
} from './pivotal-project.actions';

@Injectable()
export class PivotalProjectEffects {
  loadPivotalProject$ = createEffect(() =>
    this.store$.select(selectSettings).pipe(
      filter((settings) => settings !== null),
      switchMap((settings) => {
        return this.pivotalApiService.getProject(
          settings!.pivotalApiToken,
          settings!.pivotalProjectId
        );
      }),
      map((pivotalProject) => pivotalProjectLoadSuccess({ pivotalProject })),
      catchError(() => of(pivotalProjectLoadFailure()))
    )
  );

  constructor(
    private store$: Store,
    private pivotalApiService: PivotalApiService
  ) {}
}
