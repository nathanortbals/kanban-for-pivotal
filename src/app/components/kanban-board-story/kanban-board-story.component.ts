import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PivotalStory } from 'src/app/models/pivotal-story.model';

@Component({
  selector: 'app-kanban-board-story',
  templateUrl: './kanban-board-story.component.html',
  styleUrls: ['./kanban-board-story.component.scss'],
  host: { class: 'kanban-board-story' },
})
export class KanbanBoardStoryComponent implements OnInit {
  @Input() pivotalStory: PivotalStory | undefined;

  @HostBinding('class') class = 'kanban-board-story';

  constructor() {}

  ngOnInit(): void {
    if (this.pivotalStory?.storyType) {
      this.class = `kanban-board-story-${this.pivotalStory?.storyType}`;
    }
  }
}
