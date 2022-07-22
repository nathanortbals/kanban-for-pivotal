import { LoadState } from 'src/app/models/load-state.model';
import { PivotalPerson } from 'src/app/models/pivotal-person.model';

export interface PivotalPeopleState {
  pivotalPeople: PivotalPerson[];
  loadState: LoadState;
}
