import { PivotalStory } from './pivotal-story.model';

export interface PivotalIteration {
  stories: PivotalStory[];
  startDate: string;
  endDate: string;
}
