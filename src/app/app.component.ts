import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectSettings } from './state/settings/settings.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showStartPage$: Observable<boolean>;

  constructor(private store: Store) {
    this.showStartPage$ = this.store
      .select(selectSettings)
      .pipe(map((settings) => settings === null));
  }
}
