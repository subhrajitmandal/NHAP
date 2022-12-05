/**
 * @file: survey-data-handler.service.ts
 * @description: This is the survey data saving and returning mechanism file
 * @author: Asish Das
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { take } from 'rxjs/operators';

export interface SurveyData {
  // Form 1
  id: string;
  propertyType: number;
  highwayType: string;
  highwayNo: string;
  ownerName: string;
  plotNo: string;
  khataNo: string;
  city: string;
  district: string;
  state: string;
  oilCompanyName: string;
  cityTowardsLeft: string;
  cityTowardsRight: string;
  longLeft: string;
  latLeft: string;
  longRight: string;
  latRight: string;

  // Form 2
  roadType: number;
  locationType: string;
  serviceRoad: string;
  serviceRoadWidth: string;
  plotWidth: string;
  plotDepth: string;
  frontImage: string;
  roadLeftPhoto: string;
  roadRightPhoto: string;

  // Form 3
  nearestStoneNo1: string;
  distanceFromPlot1: string;
  nearestStoneNo2: string;
  distanceFromPlot2: string;
  stonePosition: number;
  stonePosition1: number;
  stonePosition2: number;

  //Form 4
  KMStone1: string,
  KMStone2: string,
  plotChainageNumber: string,
  plotPlacementA: string,
  plotPlacementB: string,
  plotSide: string,
  dragDrop: string,
  surveyPhoto: string
}

@Injectable({
  providedIn: 'root'
})

export class SurveyDataHandlerService {

  public surveyDataObs: Observable<any>;
  public surveyPdfObs: Observable<any>;
  public surveyDiagramObs: Observable<any>;
  private surveyDataSubject: BehaviorSubject<any>;
  private surveyPdfSubject: BehaviorSubject<any>;
  private surveyDiagramSubject: BehaviorSubject<any>;


  constructor() {
    this.surveyDataSubject = new BehaviorSubject(this.initialSurveyData());
    this.surveyDataObs = this.surveyDataSubject.asObservable();
    this.surveyPdfSubject = new BehaviorSubject(null);
    this.surveyPdfObs = this.surveyPdfSubject.asObservable();
    this.surveyDiagramSubject = new BehaviorSubject(null);
    this.surveyDiagramObs = this.surveyDiagramSubject.asObservable();
  }

  /**
   * @function: setStepFormData
   * @description: This function saves the multi form survey data in the behavior subject
   * @param: stepForm
   * @param: imageDataForm
   * @returns: void
   */
  setStepFormData(stepForm: Record<string, AbstractControl>, imageDataForm?: Record<string, File>, draftId?: string): void{

    this.surveyDataObs
    .pipe(
      take(1)
    )
    .subscribe( (surveyData) => {
      const data: Record<string, any> = surveyData;
      for(const formKey in stepForm){
        if(formKey){
          if(formKey.indexOf('Photo') === -1){
            data[formKey] = stepForm[formKey].value;
          }
          else{
            data[formKey] = imageDataForm?.[formKey];
          }
        }
      }

      // Needed for draft id setting for the first time.
      if(draftId && draftId.length){
        data['id'] = draftId;
      }

      this.surveyDataSubject.next(data);
    });
  }

  /**
   * @function: resetSurveyData
   * @description: This function resets the survey data in the behavior subject
   * @returns: void
   */
  resetSurveyData(draftData?: Record<string, any>): void {

    this.surveyDataSubject.next(this.initialSurveyData(draftData));
  }

  /**
   * @function: initialSurveyData
   * @description: This function initialises the form elements with the survey data
   * @param: null
   * @returns: Record<string, any>
   */
  initialSurveyData(draftRecords?: Record<string, any>): Record<string, any> {
    return {
      id: draftRecords?.id ? draftRecords?.id : '',
      propertyType: draftRecords?.propertyType ? draftRecords?.propertyType : '1',
      highwayType: draftRecords?.highwayType ? draftRecords?.highwayType : 'NH',
      highwayNo: draftRecords?.highwayNo ? draftRecords?.highwayNo : '',
      ownerName: draftRecords?.ownerName ? draftRecords?.ownerName : '',
      plotNo: draftRecords?.plotNo ? draftRecords?.plotNo : '',
      khataNo: draftRecords?.khataNo ? draftRecords?.khataNo : '',
      city: draftRecords?.city ? draftRecords?.city : '',
      district: draftRecords?.district ? draftRecords?.district : '',
      state: draftRecords?.state ? draftRecords?.state : '',
      oilCompanyName: draftRecords?.oilCompanyName ? draftRecords?.oilCompanyName : '',
      cityTowardsLeft: draftRecords?.cityTowardsLeft ? draftRecords?.cityTowardsLeft : '',
      cityTowardsRight: draftRecords?.cityTowardsRight ? draftRecords?.cityTowardsRight : '',
      longLeft: draftRecords?.longLeft ? draftRecords?.longLeft : '',
      latLeft: draftRecords?.latLeft ? draftRecords?.latLeft : '',
      longRight: draftRecords?.longRight ? draftRecords?.longRight : '',
      latRight: draftRecords?.latRight ? draftRecords?.latRight : '',
    
      // Form 2
      roadType: draftRecords?.roadType ? draftRecords?.roadType : '1',
      locationType: draftRecords?.locationType ? draftRecords?.locationType : '',
      serviceRoad: draftRecords?.serviceRoad ? draftRecords?.serviceRoad : '0',
      serviceRoadWidth: draftRecords?.serviceRoadWidth ? draftRecords?.serviceRoadWidth : '',
      plotWidth: draftRecords?.plotWidth ? draftRecords?.plotWidth : 0,
      plotDepth: draftRecords?.plotDepth ? draftRecords?.plotDepth : 0,
      frontImage: draftRecords?.frontImage ? draftRecords?.frontImage : null,
      roadLeftPhoto: draftRecords?.roadLeftPhoto ? draftRecords?.roadLeftPhoto : null,
      roadRightPhoto: draftRecords?.roadRightPhoto ? draftRecords?.roadRightPhoto : null,
    
      // Form 3
      nearestStoneNo1: draftRecords?.nearestStoneNo1 ? draftRecords?.nearestStoneNo1 : 0,
      distanceFromPlot1: draftRecords?.distanceFromPlot1 ? draftRecords?.distanceFromPlot1 : 0,
      nearestStoneNo2: draftRecords?.nearestStoneNo2 ? draftRecords?.nearestStoneNo2 : 0,
      distanceFromPlot2: draftRecords?.distanceFromPlot2 ? draftRecords?.distanceFromPlot2 : 0,
      stonePosition: draftRecords?.stonePosition ? draftRecords?.stonePosition : 1,
      stonePosition1: draftRecords?.stonePosition1 ? draftRecords?.stonePosition1 : 1,
      stonePosition2: draftRecords?.stonePosition2 ? draftRecords?.stonePosition2 : 2,

      // Form 4 (Calculated form)
      KMStone1: draftRecords?.KMStone1 ? draftRecords?.KMStone1 : 0,
      KMStone2: draftRecords?.KMStone2 ? draftRecords?.KMStone2 : 0,
      plotChainageNumber: draftRecords?.plotChainageNumber ? draftRecords?.plotChainageNumber : 0,
      plotPlacementA: draftRecords?.plotPlacementA ? draftRecords?.plotPlacementA : 0,
      plotPlacementB: draftRecords?.plotPlacementB ? draftRecords?.plotPlacementB : 0,
      plotSide: draftRecords?.plotSide ? draftRecords?.plotSide : 'LHS',
      dragDrop: draftRecords?.drag_drop ? draftRecords?.drag_drop : '[]'
    };
  }


  /**
   * @function: setPdfData
   * @description: Saves the pdf obj created in survey review and saves it in subject.
   * @param: pdfObj
   * @returns: void
  */
  setPdfData(pdfObj: any): void {
    this.surveyPdfSubject.next(pdfObj);
  }

  /**
   * @function: setSurveyDiagram
   * @description: Saves the survey diagram photo
   * @param: diagram
   * @returns: void
  */
   setSurveyDiagram(diagram: any): void {
    this.surveyDiagramSubject.next(diagram);
  }

  /**
   * @function: resetPdfData
   * @description: Resets the pdf subject
   * @param: null
   * @returns: void
  */
  resetPdfData(): void {
    this.surveyPdfSubject.next(null);
  }

  /**
   * @function: resetSurveyDiagram
   * @description: Resets the diagram photo subject
   * @param: null
   * @returns: void
  */
  resetSurveyDiagram(): void {
    this.surveyDiagramSubject.next(null);
  }
}
