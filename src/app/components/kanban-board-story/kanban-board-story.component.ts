import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PivotalPerson } from 'src/app/models/pivotal-person.model';
import { PivotalStory } from 'src/app/models/pivotal-story.model';
import { selectPivotalPeopleByIds } from 'src/app/state/pivotal-people/pivotal-people.selectors';

@Component({
  selector: 'app-kanban-board-story',
  templateUrl: './kanban-board-story.component.html',
  styleUrls: ['./kanban-board-story.component.scss'],
  host: { class: 'kanban-board-story' },
})
export class KanbanBoardStoryComponent implements OnInit {
  @Input() pivotalStory: PivotalStory | undefined;

  @HostBinding('class') class = 'kanban-board-story';

  public owners: Observable<PivotalPerson[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.pivotalStory?.storyType) {
      this.class = `kanban-board-story-${this.pivotalStory?.storyType}`;
    }

    if (this.pivotalStory) {
      this.owners = this.store.select(
        selectPivotalPeopleByIds(this.pivotalStory.ownerIds)
      );
    }
  }
}
