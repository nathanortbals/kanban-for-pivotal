import { LoadState } from 'src/app/models/load-state.model';
import { PivotalProject } from 'src/app/models/pivotal-project.model';

export interface PivotalProjectState {
  pivotalProject: PivotalProject | null;
  loadState: LoadState;
}
