/**
 * @file: survey-upload.component.ts
 * @description: This is the survey upload form
 * @author: Asish Das
 */
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { take, mergeMap, delay } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SurveyDataHandlerService } from './../survey-data-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SurveyService } from '../survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SurveyUploadDiagramService } from '../survey-upload-diagram.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-survey-upload',
  templateUrl: './survey-upload.component.html',
  styleUrls: ['./survey-upload.component.scss']
})

export class SurveyUploadComponent implements OnInit {

  @ViewChild('scrollMe', {read: ElementRef}) diagram!: ElementRef;
  surveyUploadForm: FormGroup;
  addImage1: Array<string>;
  uploadImage1: Array<string>;
  imagePos: number;
  //imagePosx: number;
  transformElement: number;
  isActiveMedianGap: boolean;

  constructor(private surveyDataService: SurveyDataHandlerService,
    private fBuilder: FormBuilder,
    private surveyService: SurveyService,
    private notification: MatSnackBar,
    private router: Router,
    private surveyUploadDiaService: SurveyUploadDiagramService) {


    this.addImage1 = ['Intersection', 'MedianGap', 'RoadOverBridge', 'GradeSeperator', 
                      'FuelStation', 'CheckBarrier', 'TollPlaza', 'RailwayLevelCrossing',
                      'Culvert', 'Bridge', 'RoadUnderBridge', 'School', 'ServiceRoad', 'Shop', 
                      'TruckLaybay']  
    this.uploadImage1 = [];
    this.surveyUploadForm = this.fBuilder.group({
      uploadFile1: []
    });

    this.imagePos = 0;
    //this.imagePosx = 0;
    this.transformElement = 0;
    this.isActiveMedianGap = false;
  }

  /**
   * @function: ngOnInit
   * @description: This function initialises the form elements with the survey data
   * @param: null
   * @returns: void
   */
  ngOnInit(): void {

    this.surveyDataService.surveyDataObs
      .pipe(
        take(1)
      )
      .subscribe((surveyData) => {
        // Do what needs to be done for previous file uploads.
        this.isActiveMedianGap = surveyData.roadType === '2' ? true : false;
      });
  }

  /**
   * @function: submitSurveyUpload
   * @description: This function sumits the survey data
   * @param: null
   * @returns: void
   */
  submitSurveyUpload(): void {
    
    const draftFormData: FormData = new FormData();

    html2canvas(this.diagram?.nativeElement).then((canvas) => {

      canvas.toBlob(function(blob: any) {
        draftFormData.append('surveyDiagram', new File([blob], 'diagram.jpg', { type: 'image/jpeg' }))
      }, 'image/jpeg');

        // Save the survey step's data in the survey draft.
        this.surveyDataService.surveyDataObs
        .pipe(
          delay(200),
          take(1),
          mergeMap((surveyData) => {

            //save the survey diagram in the subject to access it for exporting
            this.surveyDataService.setSurveyDiagram(draftFormData.get('surveyDiagram'));
            
            let draggedInfo: Array<Record<string, any>> = [];
            this.surveyUploadDiaService.imageUploadDiagramObs.pipe(take(1)).subscribe( (draggedImage: Array<Record<string, any>>) => {
              draggedInfo = draggedImage.length ? draggedImage : [];
            });
            return of({ surveyData: surveyData, draggedData: draggedInfo});
          })
        )
        .subscribe( (surveyInfo: {surveyData: Record<string, any>, draggedData: Array<Record<string, any>>}) => {

          for(const formKey in surveyInfo.surveyData){
            if(formKey){
              draftFormData.append(formKey, surveyInfo.surveyData[formKey]);
            }
          }
          draftFormData.append('is_draft', 'false');
          draftFormData.append('stepNo', '4');
          draftFormData.append('drag_drop', JSON.stringify(surveyInfo.draggedData));

        //  this.surveyService.saveDraft(draftFormData).pipe(take(1)).subscribe();

          this.surveyService.saveDraft(draftFormData, surveyInfo.surveyData.id).pipe(take(1)).subscribe();
        });
      });
  }

}
