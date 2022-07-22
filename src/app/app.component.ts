import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectPivotalProject } from './state/pivotal-project/pivotal-project.selectors';
import { selectSettings } from './state/settings/settings.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showStartPage$: Observable<boolean>;

  constructor(private store: Store, private title: Title) {
    this.showStartPage$ = this.store
      .select(selectSettings)
      .pipe(map((settings) => settings === null));

    this.store.select(selectPivotalProject).subscribe((pivotalProject) => {
      const pageTitle = pivotalProject?.name ?? 'Pivotal For Kanban';

      this.title.setTitle(pageTitle);
    });
  }
}
