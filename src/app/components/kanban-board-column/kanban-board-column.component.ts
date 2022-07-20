import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';
import { PivotalStory } from 'src/app/models/pivotal-story.model';
import { updatePivotalStoryState } from 'src/app/state/pivotal-stories/pivotal-stories.actions';
import { selectPivotalStoriesByState } from 'src/app/state/pivotal-stories/pivotal-stories.selectors';

@Component({
  selector: 'app-kanban-board-column',
  templateUrl: './kanban-board-column.component.html',
  styleUrls: ['./kanban-board-column.component.scss'],
  host: { class: 'kanban-board-column' },
})
export class KanbanBoardColumnComponent implements OnInit {
  @Input() pivotalStoryState: PivotalStoryState = PivotalStoryState.Unstarted;
  @Input() connectedPivotalStoryStates: PivotalStoryState[] = [];

  public pivotalStories$: Observable<PivotalStory[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pivotalStories$ = this.store.select(
      selectPivotalStoriesByState(this.pivotalStoryState)
    );
  }

  storyDropped(event: CdkDragDrop<PivotalStory[]>) {
    const pivotalStoryId = event.previousContainer.data[event.previousIndex].id;

    this.store.dispatch(
      updatePivotalStoryState({
        pivotalStoryId,
        pivotalStoryState: this.pivotalStoryState,
      })
    );
  }
}
