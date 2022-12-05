import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SurveyDataHandlerService } from '../survey-data-handler.service';

@Component({
  selector: 'app-survey-common',
  templateUrl: './survey-common.component.html',
  styleUrls: ['./survey-common.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SurveyCommonComponent implements OnInit, OnDestroy {

  selectedIndex: number;
  constructor(private surveyDataService: SurveyDataHandlerService) {
    this.selectedIndex = 0;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
      this.surveyDataService.resetSurveyData();
      this.surveyDataService.resetPdfData();
      this.surveyDataService.resetSurveyDiagram();
  }

  /**
   * @function: enableSelectedStepOnly
   * @description: This function only loads and enables the component as per the step selection.
   * @param: event 
   * @return: void
  */
  enableSelectedStepOnly(event: StepperSelectionEvent): void{
    this.selectedIndex = event.selectedIndex;
  }

}
