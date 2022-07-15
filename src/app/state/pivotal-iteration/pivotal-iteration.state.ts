import { LoadState } from 'src/app/models/load-state.model';
import { PivotalIteration } from 'src/app/models/pivotal-iteration.model';

export interface PivotalIterationState {
  pivotalIteration: PivotalIteration | null;
  loadState: LoadState;
}
