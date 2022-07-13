import { PivotalStoryState } from './pivotal-story-state.model';

export interface PivotalStory {
  name: string;
  currentState: PivotalStoryState;
}
