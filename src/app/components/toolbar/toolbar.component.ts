import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPivotalProjectName } from '../../state/pivotal-project/pivotal-project.selectors';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public readonly toolbarTitle$: Observable<string | undefined>;

  constructor(public store: Store, private dialog: MatDialog) {
    this.toolbarTitle$ = store.select(selectPivotalProjectName);
  }

  ngOnInit(): void {}

  openSettings() {
    this.dialog.open(SettingsDialogComponent, { disableClose: true });
  }
}
