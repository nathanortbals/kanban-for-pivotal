import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';

const kanbanBoardColumnsAnimation = trigger('kanbanBoardColumnsAnimation', [
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
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  animations: [kanbanBoardColumnsAnimation],
})
export class KanbanBoardComponent {
  public PivotalStoryState = PivotalStoryState;

  @HostBinding('@kanbanBoardColumnsAnimation')
  get kanbanBoardColumnsAnimation() {
    return true;
  }
}
