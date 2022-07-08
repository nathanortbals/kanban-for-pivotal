import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PivotalApiService } from '../pivotal-api.service';
import { Settings } from '../settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  public settingsFormGroup = new FormGroup({
    pivotalApiToken: new FormControl('', Validators.required),
    pivotalProjectId: new FormControl('', Validators.required),
  });
  public settingsState:
    | 'INVALID'
    | 'READY_TO_TEST'
    | 'TESTING'
    | 'TEST_SUCCEEDED'
    | 'TEST_FAILED' = 'INVALID';

  constructor(
    private settingsService: SettingsService,
    private pivotalApiService: PivotalApiService,
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.settingsService.settings$.subscribe((settings) => {
      if (settings) {
        this.settingsFormGroup.patchValue(settings);
      }
    });

    this.settingsFormGroup.statusChanges.subscribe((status) => {
      if (status === 'INVALID') {
        this.settingsState = 'INVALID';
      }

      if (status === 'VALID') {
        this.settingsState = 'READY_TO_TEST';
      }
    });
  }

  test() {
    if (
      !this.settingsFormGroup.value.pivotalApiToken ||
      !this.settingsFormGroup.value.pivotalProjectId
    ) {
      return;
    }

    this.pivotalApiService
      .testAccess(
        this.settingsFormGroup.value.pivotalApiToken,
        this.settingsFormGroup.value.pivotalProjectId
      )
      .subscribe((success) => {
        this.settingsState = success ? 'TEST_SUCCEEDED' : 'TEST_FAILED';
      });
  }

  save() {
    const settings = {
      pivotalApiToken: this.settingsFormGroup.value.pivotalApiToken,
      pivotalProjectId: this.settingsFormGroup.value.pivotalProjectId,
    } as Settings;

    this.settingsService.updateSettings(settings);

    this.snackBar.open('Settings Saved', '', { duration: 2000 });

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
