/**
 * @file: survey-road.component.ts
 * @description: This is the survey road form
 * @author: Asish Das
 */
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { take, delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyDataHandlerService } from './../survey-data-handler.service';
import { CustomValidators } from 'src/app/main/common/validators/custom.validators';
import { SurveyService } from '../survey.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-survey-road',
  templateUrl: './survey-road.component.html',
  styleUrls: ['./survey-road.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SurveyRoadComponent implements OnInit {
  
  @ViewChild('diagram', {read: ElementRef}) diagram!: ElementRef;
  surveyRoadForm: FormGroup;
  uploadFiles: Record<string, File>;

  constructor(private fbuilder: FormBuilder,
             private surveyDataService: SurveyDataHandlerService,
             private surveyService: SurveyService) {
              
    this.uploadFiles = {};
    this.surveyRoadForm = this.fbuilder.group({
      roadType: ['1', [Validators.required]],
      locationType: ['1', [Validators.required]],
      serviceRoad: ['0'],
      serviceRoadWidth: ['0'],
      plotWidth: [null, [Validators.required, Validators.pattern('^[0-9]*')]],
      plotDepth: [null, [Validators.required, Validators.pattern('^[0-9]*')]],
      // frontImage: [null, [CustomValidators.fileValidator]], 
      // frontImage: [null, [Validators.required, CustomValidators.fileValidator]],
      roadLeftPhoto: [null, [CustomValidators.fileValidator]],
      roadRightPhoto: [null, [CustomValidators.fileValidator]]
    });
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
    .subscribe( (surveyData) => {

      for(const formKey in this.surveyRoadForm.controls){

        if(formKey && (surveyData[formKey]?.length || surveyData[formKey] instanceof File)){

          if(formKey.indexOf('Photo') !== -1){
            this.uploadFiles[formKey] = surveyData[formKey];
          }
          else{
            this.surveyRoadForm.get([formKey])?.patchValue(surveyData[formKey]);
          }
        }
      }
    });

    // Updating the image as per the changes made in the form
    this.surveyRoadForm.valueChanges
    .pipe(
      delay(50)
    )
    .subscribe(() => {
      this.surveyDataService.setStepFormData(this.surveyRoadForm.controls, this.uploadFiles);
    });
  }

  /**
   * @function: submitSurveyRoad
   * @description: This function submits the survey road form
   * @param: null
   * @returns: void
   */
  submitSurveyRoad(): void {

    if(! this.surveyRoadForm.invalid){

      const draftFormData: FormData = new FormData();

      html2canvas(this.diagram?.nativeElement).then((canvas) => {

        canvas.toBlob(function(blob: any) {
          draftFormData.append('surveyDiagram', new File([blob], 'diagram.jpg', { type: 'image/jpeg' }))
        }, 'image/jpeg');

        // Save the survey step's data in the survey draft.
        this.surveyDataService.surveyDataObs
        .pipe(
          delay(200),
          take(1)
        )
        .subscribe( (surveyData) => {

          for(const formKey in surveyData){
            if(formKey){
              draftFormData.append(formKey, surveyData[formKey]);
            }
          }

          draftFormData.append('is_draft', 'true');
          draftFormData.append('stepNo', '2');
          draftFormData.append('drag_drop', JSON.stringify([]));

          this.surveyService.saveDraft(draftFormData, surveyData.id).pipe(take(1)).subscribe();
        });
      });
    }
  }

  /**
   * @function: attachImage
   * @description: This function attaches the image to the object to be used later.
   * @param: event
   * @param: imageType
   * @returns: void
   */
  attachImage(event: any, imageType: string): void {

    // Retrieves the uploaded file
    const uploadFile: File = event.target.files[0];
    
    // Checks and validates for file size
    if(uploadFile.size > 10485760) {

      this.surveyRoadForm.get([imageType])?.setErrors({maxFileSize: true});
    }
    else{

      this.uploadFiles[imageType] = uploadFile;
    }

  }

}
