import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { PivotalProjectStore } from '../pivotal-project-store.service';
import { RefreshService } from '../refresh.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public readonly toolbarTitle$: Observable<string>;

  constructor(
    private pivotalProjectStore: PivotalProjectStore,
    private dialog: MatDialog,
    private refreshService: RefreshService
  ) {
    this.toolbarTitle$ = this.pivotalProjectStore.pivotalProject$.pipe(
      map((pivotalProject) => pivotalProject.name)
    );
  }

  ngOnInit(): void {}

  refresh() {
    this.refreshService.refresh();
  }

  openSettings() {
    this.dialog.open(SettingsDialogComponent, { disableClose: true });
  }
}
