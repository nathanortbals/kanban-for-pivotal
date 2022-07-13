import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';
import { PivotalStory } from 'src/app/models/pivotal-story.model';
import { selectPivotalStoriesFromIterationByState } from 'src/app/state/pivotal-iteration/pivotal-iteration.selectors';

@Component({
  selector: 'app-kanban-board-column',
  templateUrl: './kanban-board-column.component.html',
  styleUrls: ['./kanban-board-column.component.scss'],
})
export class KanbanBoardColumnComponent implements OnInit {
  @Input() pivotalStoryState: PivotalStoryState = PivotalStoryState.Unstarted;

  public pivotalStories$: Observable<PivotalStory[] | undefined> =
    of(undefined);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pivotalStories$ = this.store.select(
      selectPivotalStoriesFromIterationByState(this.pivotalStoryState)
    );
  }
}
