/**
 * @file: survey-list-dialog.cmponents.ts
 * @description: This is a dialog for survey list view
 * @author: Asish Das
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SurveyListService } from '../survey-list.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-survey-list-dialog',
  templateUrl: './survey-list-dialog.component.html',
  styleUrls: ['./survey-list-dialog.component.scss']
})
export class SurveyListDialogComponent implements OnInit {

  surveyDetails: Record<string, any>;
  drag_drop: Array<any> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { surveyId: string },
    private surveyListService: SurveyListService) {
    this.surveyDetails = {};
  }

  ngOnInit(): void {
    this.surveyListService.getSurveyDetails(this.data.surveyId)
      .pipe(
        take(1)
      )
      .subscribe((surveyData: Record<string, any>) => {
        this.surveyDetails = surveyData.data;
        this.drag_drop = JSON.parse(this.surveyDetails.drag_drop);
        this.drag_drop.map((res) => console.log(res));
        console.log(this.drag_drop, "this.drag_drop")

        // var tollPlazaList = this.drag_drop.filter(function (el) {
        //   return el.imageName == "TOLLPLAZA"
        // });

        // console.log(tollPlazaList[0].imageName);

      });
  }



}
