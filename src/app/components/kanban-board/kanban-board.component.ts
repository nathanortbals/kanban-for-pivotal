import { Component, OnInit } from '@angular/core';
import { PivotalStoryState } from 'src/app/models/pivotal-story-state.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  public PivotalStoryState = PivotalStoryState;
  ngOnInit(): void {}
}
