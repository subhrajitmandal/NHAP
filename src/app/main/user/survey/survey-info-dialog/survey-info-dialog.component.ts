import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-survey-info-dialog',
  templateUrl: './survey-info-dialog.component.html',
  styleUrls: ['./survey-info-dialog.component.scss'],
})
export class SurveyInfoDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SurveyInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { header: string; content: string }
  ) {}

  ngOnInit(): void {}

  closeDialog(status: string): void {
    this.dialogRef.close(status);
  }
}