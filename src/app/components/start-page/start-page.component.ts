import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class GetStartedPageComponent {
  constructor(private dialog: MatDialog) {}

  openSettings() {
    this.dialog.open(SettingsDialogComponent, { disableClose: true });
  }
}
