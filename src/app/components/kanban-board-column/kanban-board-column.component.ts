import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';
import { PivotalStory } from 'src/app/models/pivotal-story.model';
import { updatePivotalStoryState } from 'src/app/state/pivotal-stories/pivotal-stories.actions';
import { selectPivotalStoriesByState } from 'src/app/state/pivotal-stories/pivotal-stories.selectors';

const storiesAnimation = trigger('storiesAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('80ms', animate('600ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
  ]),
]);

@Component({
  selector: 'app-kanban-board-column',
  templateUrl: './kanban-board-column.component.html',
  styleUrls: ['./kanban-board-column.component.scss'],
  animations: [storiesAnimation],
  host: { class: 'kanban-board-column' },
})
export class KanbanBoardColumnComponent implements OnInit {
  @Input() pivotalStoryState: PivotalStoryState = PivotalStoryState.Unstarted;
  @Input() connectedPivotalStoryStates: PivotalStoryState[] = [];

  public pivotalStories$: Observable<PivotalStory[]> = of([]);

  private readonly storyStatesRequiringEstimate = [
    PivotalStoryState.Accepted,
    PivotalStoryState.Delivered,
    PivotalStoryState.Finished,
    PivotalStoryState.Rejected,
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pivotalStories$ = this.store.select(
      selectPivotalStoriesByState(this.pivotalStoryState)
    );
  }

  canPivotalStoryEnterState = (item: CdkDrag<PivotalStory>): boolean => {
    return !(
      item.data.estimate === undefined &&
      this.storyStatesRequiringEstimate.includes(this.pivotalStoryState)
    );
  };

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
