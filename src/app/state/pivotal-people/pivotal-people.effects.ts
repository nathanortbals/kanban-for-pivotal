import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { PivotalApiService } from 'src/app/services/pivotal-api.service';
import { selectSettings } from '../settings/settings.selectors';
import {
  pivotalPeopleLoadFailure,
  pivotalPeopleLoadSuccess,
} from './pivotal-people.actions';

@Injectable()
export class PivotalPeopleEffects {
  loadPivotalPeople$ = createEffect(() =>
    this.store$.select(selectSettings).pipe(
      filter((settings) => settings !== null),
      switchMap((settings) => {
        return this.pivotalApiService.getPivotalPeopleForProject(
          settings!.pivotalApiToken!,
          settings!.pivotalProjectId!
        );
      }),
      map((pivotalPeople) => pivotalPeopleLoadSuccess({ pivotalPeople })),
      catchError(() => of(pivotalPeopleLoadFailure()))
    )
  );

  constructor(
    private store$: Store,
    private pivotalApiService: PivotalApiService
  ) {}
}
