import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-survey-dialog',
  templateUrl: './admin-survey-dialog.component.html',
  styleUrls: ['./admin-survey-dialog.component.scss'],
})
export class AdminSurveyDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AdminSurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  closeDialog(status: string): void {
    this.dialogRef.close(status);
  }
}
