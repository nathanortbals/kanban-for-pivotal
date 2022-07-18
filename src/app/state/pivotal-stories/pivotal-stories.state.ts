import { LoadState } from 'src/app/models/load-state.model';
import { PivotalStory } from 'src/app/models/pivotal-story.model';

export interface PivotalStoriesState {
  pivotalStories: PivotalStory[];
  loadState: LoadState;
}
