import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject: BehaviorSubject<Settings | null>;

  public get settings$() {
    return this.settingsSubject.asObservable();
  }

  constructor() {
    const pivotalApiToken = localStorage.getItem('pivotalApiToken');
    const pivotalProjectId = localStorage.getItem('pivotalProjectId');

    let settings: Settings | null = null;
    if (pivotalApiToken && pivotalProjectId) {
      settings = { pivotalApiToken, pivotalProjectId };
    }

    this.settingsSubject = new BehaviorSubject(settings);
  }

  updateSettings(settings: Settings | null) {
    if (settings) {
      localStorage.setItem('pivotalApiToken', settings.pivotalApiToken);
      localStorage.setItem('pivotalProjectId', settings.pivotalProjectId);
    }

    this.settingsSubject.next(settings);
  }
}
