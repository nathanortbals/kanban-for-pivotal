import { PivotalStoryState } from './pivotal-story-state.model';
import { PivotalStoryType } from './pivotal-story-type.model';

export interface PivotalStory {
  id: number;
  name: string;
  currentState: PivotalStoryState;
  storyType: PivotalStoryType;
  ownerIds: number[];
}
