/**
 * @file: survey-dialog.cmponents.ts
 * @description: This is a common dialog meant only for the survey section
 * @author: Asish Das
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SurveyDataHandlerService } from '../survey-data-handler.service';
import { SurveyUploadDiagramService } from '../survey-upload-diagram.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.scss']
})
export class SurveyDialogComponent implements OnInit {
  additionalInformationForm: FormGroup;
  cityOptions: Array<any>;

  constructor(private fBuilder: FormBuilder,
              private uploadDiagramService: SurveyUploadDiagramService,
              private dialogRef: MatDialogRef<SurveyDialogComponent>,
              private surveyDataService: SurveyDataHandlerService,
              @Inject(MAT_DIALOG_DATA) public data: {formType: string, isUpdateImage: boolean}) {
    
    this.additionalInformationForm = this.fBuilder.group({
      propertyDistance: [0, [Validators.required]],
      propertyPosition: [0, [Validators.required]],
      propertyOrientation: [1, [Validators.required]],
      propertyWidth: ['1', [Validators.required]],
      roadLength: ['1', [Validators.required]]
    });

    this.cityOptions = [];
  }

  ngOnInit(): void {

    this.uploadDiagramService.isResetFormObs
    .subscribe( (imageDataForm: Record<string, any>) => {
      this.initialiseForm(imageDataForm);
    });

    this.surveyDataService.surveyDataObs
      .pipe(
        take(1)
      )
      .subscribe((surveyData) => {
        this.cityOptions.push(surveyData?.cityTowardsLeft);
        this.cityOptions.push(surveyData?.cityTowardsRight);
      });

    this.uploadDiagramService.isIntersectionObs
    .subscribe( (intersection: boolean) => {
      if(intersection){

        //If intersection then clear validators from orientation, width and position.
        this.additionalInformationForm.get('propertyOrientation')?.clearValidators();
        this.additionalInformationForm.get('propertyWidth')?.clearValidators();
        this.additionalInformationForm.get('propertyPosition')?.clearValidators();
        this.additionalInformationForm.get('roadLength')?.addValidators([Validators.required]);
        this.additionalInformationForm.updateValueAndValidity();
      }
      else{

        // If not intersection type then add validators for orientation, width and position.
        this.additionalInformationForm.get('propertyOrientation')?.addValidators([Validators.required]);
        this.additionalInformationForm.get('propertyWidth')?.addValidators([Validators.required]);
        this.additionalInformationForm.get('propertyPosition')?.addValidators([Validators.required]);
        this.additionalInformationForm.get('roadLength')?.clearValidators();
        this.additionalInformationForm.updateValueAndValidity();
      }
    });
  }

  /**
   * @function: initialiseForm
   * @description: This function resets or patches the values of the form
   * @param: imageData
   * @returns: void
   */
  initialiseForm(imageData: Record<string, any>): void {

    if(imageData.isReset){
      this.additionalInformationForm.reset({
        propertyDistance: imageData.imageDistance,
        propertyOrientation: imageData.imageOrientation,
        propertyWidth: imageData.imageWidth,
        propertyPosition: imageData.imagePos,
        roadLength: imageData.roadLength
      });
    }
    else{
      this.additionalInformationForm.patchValue({
        propertyDistance: imageData.imageDistance ? imageData.imageDistance : 0,
        propertyOrientation: imageData.imageOrientation ? imageData.imageOrientation : 1,
        propertyWidth: imageData.imageWidth ? imageData.imageWidth : '1',
        propertyPosition: imageData.imagePos ? imageData.imagePos : 0,
        roadLength: imageData.roadLength ? imageData.roadLength : '1'
      });
    }
  }

  /**
   * @function: closeDialog
   * @description: This function closes the dialog & sends flag if ok or cancel is clicked
   * @param: null
   * @returns: void
   */
   closeDialog(status: string): void {

    // If add or update then ok is returned so checking for validity of form
    if (status.toLowerCase() === 'ok' && this.additionalInformationForm.valid) {
      const formData = {
        propertyDistance: this.additionalInformationForm.get('propertyDistance')?.value,
        propertyOrientation: this.additionalInformationForm.get('propertyOrientation')?.value,
        propertyWidth: this.additionalInformationForm.get('propertyWidth')?.value,
        propertyPosition: this.additionalInformationForm.get('propertyPosition')?.value,
        roadLength: this.additionalInformationForm.get('roadLength')?.value,
        status: 'add'
      }

      this.dialogRef.close(formData);
    }

    // If delete then delete is returned and accordingly that is sent back to the subscribe.
    if (status.toLowerCase() === 'delete') {

      const formData = {
        propertyDistance: this.additionalInformationForm.get('propertyDistance')?.value,
        propertyOrientation: this.additionalInformationForm.get('propertyOrientation')?.value,
        propertyWidth: this.additionalInformationForm.get('propertyWidth')?.value,
        propertyPosition: this.additionalInformationForm.get('propertyPosition')?.value,
        roadLength: this.additionalInformationForm.get('roadLength')?.value,
        status: 'delete'
      }

      this.dialogRef.close(formData);
    }
  }
}
