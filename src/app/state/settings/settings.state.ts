import { LoadState } from 'src/app/models/load-state.model';
import { Settings } from '../../models/settings.model';

export interface SettingsState {
  settings: Settings | null;
  loadState: LoadState;
}
