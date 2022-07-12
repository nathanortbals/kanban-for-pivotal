import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PivotalStory } from 'src/app/models/pivotal-story.model';
import { selectPivotalStories } from 'src/app/state/pivotal-stories/pivotal-project.selectors';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  public pivotalStories$: Observable<PivotalStory[]>;

  constructor(private store: Store) {
    this.pivotalStories$ = this.store.select(selectPivotalStories);
  }

  ngOnInit(): void {}
}
