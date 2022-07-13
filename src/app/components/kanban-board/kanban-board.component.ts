import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PivotalStory } from 'src/app/models/pivotal-story.model';
import { selectPivotalStoriesFromIteration } from 'src/app/state/pivotal-iteration/pivotal-iteration.selectors';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  public pivotalStories$: Observable<PivotalStory[] | undefined>;

  constructor(private store: Store) {
    this.pivotalStories$ = this.store.select(selectPivotalStoriesFromIteration);
  }

  ngOnInit(): void {}
}
