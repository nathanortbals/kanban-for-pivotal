import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Settings } from '../settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  settingsFormGroup = new FormGroup({
    pivotalApiToken: new FormControl('', Validators.required),
    pivotalProjectId: new FormControl('', Validators.required),
  });

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.settings$.subscribe((settings) => {
      if (settings) {
        this.settingsFormGroup.patchValue(settings);
      }
    });
  }

  test() {}

  save() {
    const settings = {
      pivotalApiToken: this.settingsFormGroup.value.pivotalApiToken,
      pivotalProjectId: this.settingsFormGroup.value.pivotalProjectId,
    } as Settings;

    this.settingsService.updateSettings(settings);
  }
}
