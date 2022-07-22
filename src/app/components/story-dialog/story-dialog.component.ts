import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.scss'],
})
export class StoryDialogComponent implements OnInit {
  constructor(private dialogRef: DialogRef) {}

  ngOnInit(): void {}
}
