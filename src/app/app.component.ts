import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { selectPivotalProject } from './state/pivotal-project/pivotal-project.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showKanbanBoard$: Observable<boolean>;

  constructor(private store: Store) {
    this.showKanbanBoard$ = this.store.select(selectPivotalProject).pipe(
      tap((pivotalProject) => console.log(pivotalProject)),
      map((pivotalProject) => pivotalProject !== null)
    );
  }
}
