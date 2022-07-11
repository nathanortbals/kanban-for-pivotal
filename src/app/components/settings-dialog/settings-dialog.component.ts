import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SettingsDialogStore } from './settings-dialog.store';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsDialogStore],
})
export class SettingsDialogComponent implements OnInit {
  constructor(
    public settingsDialogStore: SettingsDialogStore,
    private dialogRef: DialogRef
  ) {}

  ngOnInit(): void {}

  test() {
    this.settingsDialogStore.testSettings();
  }

  save() {
    this.settingsDialogStore.saveSettings();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
