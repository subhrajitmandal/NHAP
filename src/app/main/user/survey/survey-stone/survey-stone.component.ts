/**
 * @file: survey-stone.component.ts
 * @description: This is the survey stone form
 * @author: Asish Das
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import { take, delay } from 'rxjs/operators';
import { SurveyService } from '../survey.service';
import { SurveyDataHandlerService } from './../survey-data-handler.service';

@Component({
  selector: 'app-survey-stone',
  templateUrl: './survey-stone.component.html',
  styleUrls: ['./survey-stone.component.scss']
})
export class SurveyStoneComponent implements OnInit {

  @ViewChild('diagram', {read: ElementRef}) diagram!: ElementRef;
  surveyStoneForm: FormGroup;
  stoneImage: string = '';
  cityOptions: Array<string> = ['', ''];

  constructor(private fbuilder: FormBuilder,
    private surveyDataService: SurveyDataHandlerService,
    private surveyService: SurveyService) {
      
    this.surveyStoneForm = this.fbuilder.group({
      nearestStoneNo1: [0, [Validators.required, Validators.pattern('^[0-9]*')]],
      distanceFromPlot1: [0, [Validators.required, Validators.pattern('^[0-9]*')]],
      nearestStoneNo2: [0, [Validators.required, Validators.pattern('^[0-9]*')]],
      distanceFromPlot2: [{ value: 0, disabled: true }, [Validators.required, Validators.pattern('^[0-9]*')]],
      stonePosition: ['1', [Validators.required]],
      stonePosition1: ['1', [Validators.required]],
      stonePosition2: ['2', [Validators.required]]
    });

    // this.stoneImage = '';
  }

  /**
   * @function: ngOnInit
   * @description: This function initialises the form elements with the survey data
   * @param: null
   * @returns: void
   */
  ngOnInit(): void {

    // Update the stone distance from plot 2 on change of distance from plot 1 input
    this.surveyStoneForm.get('distanceFromPlot1')?.valueChanges
      .subscribe((data: number) => {

        if (data > 1000) {
          this.surveyStoneForm.get('distanceFromPlot2')?.patchValue(1000 - data % 1000);
        }
        else {
          this.surveyStoneForm.get('distanceFromPlot2')?.patchValue(1000 - data);
        }

      });

    this.surveyDataService.surveyDataObs
      .pipe(
        take(1)
      )
      .subscribe((surveyData) => {

        this.cityOptions[0] = surveyData?.cityTowardsLeft;
        this.cityOptions[1] = surveyData?.cityTowardsRight;

        for (const formKey in this.surveyStoneForm.controls) {

          if (formKey && surveyData[formKey]?.length) {

            this.surveyStoneForm.get([formKey])?.patchValue(surveyData[formKey]);
          }
        }
      });

    // Update the image section on changes to the form elements
    this.surveyStoneForm.valueChanges
      .subscribe(() => {
        this.surveyDataService.setStepFormData(this.surveyStoneForm.controls);
      });
  }

  /**
   * @function: stoneSelectionChange
   * @description: This function handles the image on selection change of stone
   * @param: null
   * @returns: void
   */
  stoneSelectionChange(selectedValue: any): void {
    if (selectedValue === '-1') {
      this.stoneImage = 'assets/Images/KMStone/1.png';
    }
    else {
      this.stoneImage = 'assets/Images/KMStone/' + selectedValue + '.png';
    }
  }

  /**
   * @function: submitSurveyStone
   * @description: This function submits the survey stone form
   * @param: null
   * @returns: void
   */
  submitSurveyStone(): void {

    if (!this.surveyStoneForm.invalid) {

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
          draftFormData.append('stepNo', '3');
          draftFormData.append('drag_drop', JSON.stringify([]));

          this.surveyService.saveDraft(draftFormData, surveyData.id).pipe(take(1)).subscribe();
        });
      });
    }
  }

}
