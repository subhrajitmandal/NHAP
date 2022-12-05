import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyListService } from './survey-list.service';
import { take, mergeMap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SurveyDataHandlerService } from '../survey/survey-data-handler.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SurveyListDialogComponent } from './survey-list-dialog/survey-list-dialog.component';

import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface SurveyListDatatype {
  surveyNo: string;
  highwayNo: string;
  highwayType: string;
  date: string;
  id: string;
  isDraft: boolean;
  payment_status: boolean;
  propertyType: string;
  roadType: string;
  locationType: string;
  serviceRoad: string;
  plotNo: string;
  khataNo: string;
  cityTowardsLeft: string,
  cityTowardsRight: string,
  city: string,
  district: string,
  state: string,
  latLeft: string,
  longLeft: string,
  latRight: string,
  longRight: string,
  oilCompanyName: string,
  roadLeftPhoto: string,
  roadRightPhoto: string,
  surveyDiagram: string,
  plotWidth: string,
  plotDepth: string,
  plotChainageNumber: string,
  plotPlacementA: string,
  plotPlacementB: string,
  plotSide: string,
  drag_drop: string
}

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[];
  surveyDatasource: MatTableDataSource<SurveyListDatatype>;

  condition1: boolean = false;
  condition2: boolean = false;
  condition3: boolean = false;
  condition4: boolean = false;
  condition5: boolean = false;
  condition6: boolean = false;
  condition7: boolean = false;
  condition8: boolean = false;

  plotWidthNorm: boolean = false;
  plotDepthNorm: boolean = false;
  intersectionCondition: boolean = true;
  checkBarrierCondition: boolean = true;
  tollPlazaCondition: boolean = true;
  railwayLevelCrossingCondition: boolean = true;
  roadOverBridgeCondition: boolean = true;
  gradeSeperatorCondition: boolean = true;
  roadUnderBridgeCondition: boolean = true;
  fuelStationCondition: boolean = true;
  medianGapCondition: boolean = true;

  compliance: boolean = true;

  stretchType: string = '';

  constructor(private notification: MatSnackBar,
    private surveylistService: SurveyListService,
    private router: Router,
    private dataService: SurveyDataHandlerService,
    private dialog: MatDialog) {
    this.displayedColumns = ['surveyNo', 'nhNo', 'date', 'view', 'download'];  //'edit'
    this.surveyDatasource = new MatTableDataSource<SurveyListDatatype>();
  }

  /**
   * @function: ngAfterViewInit
   * @description: This function sets the paginator and sorting of the table.
   * @param: null
   * @returns: void
   */
  ngAfterViewInit() {
    this.surveyDatasource.paginator = this.paginator;
    this.surveyDatasource.sort = this.sort;
  }

  /**
   * @function: ngOnInit
   * @description: This function sets the data in the datasource of the table
   * @param: null
   * @returns: void
   */
  ngOnInit(): void {

    this.surveylistService.getSurveyList()
      .pipe(
        take(1)
      )
      .subscribe((surveyData: {
        data: {
          updated_at: string,
          survey_id: string,
          propertyType: string,
          roadType: string,
          locationType: string,
          serviceRoad: string,
          highwayType: string,
          highwayNo: string,
          id: string,
          is_draft: boolean,
          payment_status: boolean,
          plotNo: string,
          khataNo: string,
          cityTowardsLeft: string,
          cityTowardsRight: string,
          city: string,
          district: string,
          state: string,
          oilCompanyName: string,
          latLeft: string,
          longLeft: string,
          latRight: string,
          longRight: string,
          roadLeftPhoto: string,
          roadRightPhoto: string,
          surveyDiagram: string,
          plotWidth: string,
          plotDepth: string,
          plotChainageNumber: string,
          plotPlacementA: string,
          plotPlacementB: string,
          plotSide: string,
          drag_drop: string
        }[], success: string
      }) => {

        // Assign the surveyData to the datasource's data
        const surveyListData: SurveyListDatatype[] = [];
        let surveyListIndex = 0;
        if (surveyData.success === 'true') {

          // Remove this loop after the API changes.
          for (const value of surveyData.data) {
            // SingleRoadType: roadType == "1", DoubleRoadType: roadType == "2"
            // UrbanLocationType: locationType == "1", RuralLocationType: locationType == "2"
            // ServiceRoad: serviceRoad=="1", NoServiceRoad: serviceRoad=="0"

            const listValues = {
              highwayType: value.highwayType,
              highwayNo: value.highwayNo,
              surveyNo: value.survey_id,
              plotNo: value.plotNo,
              date: value.updated_at.slice(0, 19).replace('T', ' '),
              id: value.id,
              isDraft: value.is_draft,
              payment_status: value.payment_status,
              propertyType: value.propertyType,
              roadType: value.roadType,
              locationType: value.locationType,
              serviceRoad: value.serviceRoad,
              khataNo: value.khataNo,
              cityTowardsLeft: value.cityTowardsLeft,
              cityTowardsRight: value.cityTowardsRight,
              city: value.city,
              district: value.district,
              state: value.state,
              oilCompanyName: value.oilCompanyName,
              latLeft: value.latLeft,
              longLeft: value.longLeft,
              latRight: value.latRight,
              longRight: value.longRight,
              roadRightPhoto: value.roadRightPhoto,
              surveyDiagram: value.surveyDiagram,
              roadLeftPhoto: value.roadLeftPhoto,
              plotWidth: value.plotWidth,
              plotDepth: value.plotDepth,
              plotChainageNumber: value.plotChainageNumber,
              plotPlacementA: value.plotPlacementA,
              plotPlacementB: value.plotPlacementB,
              plotSide: value.plotSide,
              drag_drop: value.drag_drop
            }
            surveyListData[surveyListIndex] = listValues;
            surveyListIndex++;
          }

          this.surveyDatasource.data = surveyListData;
        }

      });

    // console.log(this.condition1, this.condition2, this.condition3, this.condition4, this.condition5, this.condition6, this.condition7, this.condition8)
    //  
  }
  

  /**
   * @function: handleViewSurvey
   * @description: This function handles the click for view of the survey details
   * @param: selectedSurvey, event
   * @returns: void
   */
  handleViewSurvey(selectedSurvey: SurveyListDatatype, event: Event): void {
    event.stopPropagation();

    const templateRef = this.dialog.open(SurveyListDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: { surveyId: selectedSurvey.id }
    })

  }

  /**
   * @function: handleDownloadSurvey
   * @description: This function handles the click for download of the survey details
   * @param: selectedSurvey, event
   * @returns: void
   */
  handleDownloadSurvey(selectedSurvey: SurveyListDatatype, event: Event): void {
    event.stopPropagation();

    // Delete the log and notification after the survey display is complete.
    console.log(selectedSurvey);
    this.condition1 = selectedSurvey.roadType == "1" && selectedSurvey.locationType == "2" && selectedSurvey.serviceRoad == "1";
    this.condition2 = selectedSurvey.roadType == "2" && selectedSurvey.locationType == "2" && selectedSurvey.serviceRoad == "1";
    this.condition3 = selectedSurvey.roadType == "1" && selectedSurvey.locationType == "1" && selectedSurvey.serviceRoad == "1";
    this.condition4 = selectedSurvey.roadType == "2" && selectedSurvey.locationType == "1" && selectedSurvey.serviceRoad == "1";
    this.condition5 = selectedSurvey.roadType == "2" && selectedSurvey.locationType == "2" && selectedSurvey.serviceRoad == "0";
    this.condition6 = selectedSurvey.roadType == "2" && selectedSurvey.locationType == "1" && selectedSurvey.serviceRoad == "0";
    this.condition7 = selectedSurvey.roadType == "1" && selectedSurvey.locationType == "2" && selectedSurvey.serviceRoad == "0";
    this.condition8 = selectedSurvey.roadType == "1" && selectedSurvey.locationType == "1" && selectedSurvey.serviceRoad == "0";
    // this.notification.open('Under Construction!!! This shall download the survey details.', 'Ok');

    const drag_drop = JSON.parse(selectedSurvey.drag_drop);


    var tollPlazaList = drag_drop.filter(function (el:any) {
      return el.imageName == "TollPlaza".toUpperCase();
    });
    var checkBarrierList = drag_drop.filter(function (el:any) {
      return el.imageName == "CheckBarrier".toUpperCase();
    });
    var intersectionList = drag_drop.filter(function (el:any) {
      return el.imageName == "Intersection".toUpperCase();
    });
    var medianGapList = drag_drop.filter(function (el:any) {
      return el.imageName == "MedianGap".toUpperCase();
    });
    var railwayLevelCrossingList = drag_drop.filter(function (el:any) {
      return el.imageName == "RailwayLevelCrossing".toUpperCase();
    });
    var roadOverBridgeList = drag_drop.filter(function (el:any) {
      return el.imageName == "RoadOverBridge".toUpperCase();
    });
    var gradeSeperatorList = drag_drop.filter(function (el:any) {
      return el.imageName == "GradeSeperator".toUpperCase();
    });
    var roadUnderBridgeList = drag_drop.filter(function (el:any) {
      return el.imageName == "RoadUnderBridge".toUpperCase();
    });
    var fuelStationList = drag_drop.filter(function (el:any) {
      return el.imageName == "FuelStation".toUpperCase();
    });

    // console.log(tollPlazaList[0].imageName, "tollPlazaListDownload")

    if (this.condition1) {
      this.stretchType = 'Rural Stretch';
      this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "35";
      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm;
    }
    else if (this.condition2) {
      this.stretchType = 'Rural Stretch';
      this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "35";
      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm;
    }
    else if (this.condition3) {
      this.stretchType = 'Urban Stretch';
      this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "35";
      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm;
    }
    else if (this.condition4) {
      this.stretchType = 'Urban Stretch';
      this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "35";
      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm;
    }
    else if (this.condition5) {
      this.stretchType = 'Rural Stretch Divided carriage way';

      this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "35";

      // IntersectionCondition
      if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 300 || intersectionList[0]?.imageDistance == undefined) {
        if(intersectionList[0]?.imageWidth == 1 && intersectionList[0]?.roadLength == 1){
          this.intersectionCondition = false;
        }else{
          this.intersectionCondition = true;
        }
      }
      else {
        this.intersectionCondition = false
      }

      // MedianGapCondition
      if (medianGapList[0]?.imageDistance && medianGapList[0]?.imageDistance >= 300 || medianGapList[0]?.imageDistance == undefined) {
        this.medianGapCondition = true
      }
      else {
        this.medianGapCondition = false
      }

      // CheckBarrierCondition
      if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
        this.checkBarrierCondition = true
      }
      else {
        this.checkBarrierCondition = false
      }

      // TollPlazaCondition
      if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
        this.tollPlazaCondition = true
      }
      else {
        this.tollPlazaCondition = false
      }

      // railwayLevelCrossingCondition
      if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
        this.railwayLevelCrossingCondition = true
      }
      else {
        this.railwayLevelCrossingCondition = false
      }

      // RoadOverBridgeCondition
      if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
        this.roadOverBridgeCondition = true
      }
      else {
        this.roadOverBridgeCondition = false
      }

      // GradeSeperatorCondition
      if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
        this.gradeSeperatorCondition = true
      }
      else {
        this.gradeSeperatorCondition = false
      }

      // RoadUnderBridgeCondition
      if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
        this.roadUnderBridgeCondition = true
      }
      else {
        this.roadUnderBridgeCondition = false
      }

      // FuelStationCondition
      if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 1000 || fuelStationList[0]?.imageDistance == undefined) {
        this.fuelStationCondition = true
      }
      else {
        this.fuelStationCondition = false
      }

      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm && this.medianGapCondition && this.intersectionCondition && this.checkBarrierCondition && this.tollPlazaCondition && this.railwayLevelCrossingCondition && this.roadOverBridgeCondition
        && this.gradeSeperatorCondition && this.roadOverBridgeCondition && this.fuelStationCondition;

    }
    else if (this.condition6) {
      this.stretchType = 'Urban Stretch Divided carriage way';

      this.plotWidthNorm = selectedSurvey.plotWidth >= "20";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "20";

      // IntersectionCondition
      if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 100 || intersectionList[0]?.imageDistance == undefined) {
        this.intersectionCondition = true
      }
      else {
        this.intersectionCondition = false
      }

      // MedianGapCondition
      if (medianGapList[0]?.imageDistance && medianGapList[0]?.imageDistance >= 100 || medianGapList[0]?.imageDistance == undefined) {
        this.intersectionCondition = true
      }
      else {
        this.intersectionCondition = false
      }

      // CheckBarrierCondition
      if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
        this.checkBarrierCondition = true
      }
      else {
        this.checkBarrierCondition = false
      }

      // TollPlazaCondition
      if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
        this.tollPlazaCondition = true
      }
      else {
        this.tollPlazaCondition = false
      }

      // railwayLevelCrossingCondition
      if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
        this.railwayLevelCrossingCondition = true
      }
      else {
        this.railwayLevelCrossingCondition = false
      }

      // RoadOverBridgeCondition
      if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
        this.roadOverBridgeCondition = true
      }
      else {
        this.roadOverBridgeCondition = false
      }

      // GradeSeperatorCondition
      if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
        this.gradeSeperatorCondition = true
      }
      else {
        this.gradeSeperatorCondition = false
      }

      // RoadUnderBridgeCondition
      if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
        this.roadUnderBridgeCondition = true
      }
      else {
        this.roadUnderBridgeCondition = false
      }

      // FuelStationCondition
      if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 300 || fuelStationList[0]?.imageDistance == undefined) {
        this.fuelStationCondition = true
      }
      else {
        this.fuelStationCondition = false
      }

      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm && this.medianGapCondition && this.intersectionCondition && this.checkBarrierCondition && this.tollPlazaCondition && this.railwayLevelCrossingCondition && this.roadOverBridgeCondition
        && this.gradeSeperatorCondition && this.roadOverBridgeCondition && this.fuelStationCondition;

    }
    else if (this.condition7) {
      this.stretchType = 'Rural Stretch Undivided carriage way';

      this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "35";

      // IntersectionCondition
      if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 300 || intersectionList[0]?.imageDistance == undefined) {
        this.intersectionCondition = true
      }
      else {
        this.intersectionCondition = false
      }

      // CheckBarrierCondition
      if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
        this.checkBarrierCondition = true
      }
      else {
        this.checkBarrierCondition = false
      }

      // TollPlazaCondition
      if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
        this.tollPlazaCondition = true
      }
      else {
        this.tollPlazaCondition = false
      }

      // railwayLevelCrossingCondition
      if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
        this.railwayLevelCrossingCondition = true
      }
      else {
        this.railwayLevelCrossingCondition = false
      }

      // RoadOverBridgeCondition
      if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
        this.roadOverBridgeCondition = true
      }
      else {
        this.roadOverBridgeCondition = false
      }

      // GradeSeperatorCondition
      if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
        this.gradeSeperatorCondition = true
      }
      else {
        this.gradeSeperatorCondition = false
      }

      // RoadUnderBridgeCondition
      if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
        this.roadUnderBridgeCondition = true
      }
      else {
        this.roadUnderBridgeCondition = false
      }

      // FuelStationCondition
      if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 300 || fuelStationList[0]?.imageDistance == undefined) {
        this.fuelStationCondition = true
      }
      else {
        this.fuelStationCondition = false
      }

      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm && this.intersectionCondition && this.checkBarrierCondition && this.tollPlazaCondition && this.railwayLevelCrossingCondition && this.roadOverBridgeCondition
        && this.gradeSeperatorCondition && this.roadOverBridgeCondition && this.fuelStationCondition;
    }
    else {
      this.stretchType = 'Urban Stretch Undivided carriage way';

      this.plotWidthNorm = selectedSurvey.plotWidth >= "20";
      this.plotDepthNorm = selectedSurvey.plotDepth >= "20";

      // IntersectionCondition
      if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 100 || intersectionList[0]?.imageDistance == undefined) {
        this.intersectionCondition = true
      }
      else {
        this.intersectionCondition = false
      }

      // CheckBarrierCondition
      if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
        this.checkBarrierCondition = true
      }
      else {
        this.checkBarrierCondition = false
      }

      // TollPlazaCondition
      if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
        this.tollPlazaCondition = true
      }
      else {
        this.tollPlazaCondition = false
      }

      // railwayLevelCrossingCondition
      if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
        this.railwayLevelCrossingCondition = true
      }
      else {
        this.railwayLevelCrossingCondition = false
      }

      // RoadOverBridgeCondition
      if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
        this.roadOverBridgeCondition = true
      }
      else {
        this.roadOverBridgeCondition = false
      }

      // GradeSeperatorCondition
      if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
        this.gradeSeperatorCondition = true
      }
      else {
        this.gradeSeperatorCondition = false
      }

      // RoadUnderBridgeCondition
      if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
        this.roadUnderBridgeCondition = true
      }
      else {
        this.roadUnderBridgeCondition = false
      }

      // FuelStationCondition
      if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 300 || fuelStationList[0]?.imageDistance == undefined) {
        this.fuelStationCondition = true
      }
      else {
        this.fuelStationCondition = false
      }

      // Compliance
      this.compliance = this.plotWidthNorm && this.plotDepthNorm && this.intersectionCondition && this.checkBarrierCondition && this.tollPlazaCondition && this.railwayLevelCrossingCondition && this.roadOverBridgeCondition
        && this.gradeSeperatorCondition && this.roadOverBridgeCondition && this.fuelStationCondition;

    }

    // this.plotWidthNorm = selectedSurvey.plotWidth >= "35";
    // this.plotDepthNorm = selectedSurvey.plotDepth >= "35";
    // const plotWidthNorm2 = selectedSurvey.plotWidth >= "20";
    // const plotDepthNorm2 = selectedSurvey.plotDepth >= "20";

    console.log(this.stretchType, this.condition1, this.condition2, this.condition3, this.condition4, this.condition5, this.condition6, this.condition7, this.condition8)


    var pdf = new jspdf('p', 'mm', 'a4');
    // let PDFdata = document.getElementById('PDFcontent')!;

    const toData =
      `To,
     State Head
     Reliance BP Mobility Ltd Bhubaneswar,
     Odisha`;
    const title = 'FEASIBILITY REPORT';
    const subTitle = `Feasibility Report for Proposal of MS/HSD Retail Outlet at Plot no.${selectedSurvey?.plotNo} Khata no. ${selectedSurvey?.khataNo}. Ch.${selectedSurvey?.plotChainageNumber}.${selectedSurvey?.plotPlacementA} (${selectedSurvey?.plotSide}), ${selectedSurvey?.cityTowardsLeft} to ${selectedSurvey?.cityTowardsRight}, On ${selectedSurvey?.highwayType}-${selectedSurvey?.highwayNo}, City- ${selectedSurvey?.city}, District- ${selectedSurvey?.district}, State- ${selectedSurvey?.state}`;
    const footer =
      ' Consultant: \n 3D ViSiON \n Plot.No. 4707/5004, \n Adimata Colony, Gadakana, Bhubaneswar-17 \n E-mail: admin@3dvision.co.in Tel No: 674, 2748127 \n Mob: 8270009000';

    const aboutCompanyTitle = 'About NH Access Permission';
    const aboutCompany = 'The persons or entities requiring an access to a National Highway, shall submit a self-certified proposal for obtaining access permission to the concerned Authority, to whom such Highway is entrusted, (i.e. The project Director of the National Highways Authority of India/General manager or Deputy General Manager of the National Highway Infrastructural Development Corporation Limited / Executive Engineer of the National Highway Wing of the State Public Work Departments). \n\nOn receiving the documents and after checking the same, if the authority finds the documents are in order as per the Ministry guide line, may give the Provisional NOC for construction of Access to the property. \n \nOn completion of access to the property as per the Provisional NOC the persons or entities can apply to the Highway Administration for granting final NOC.';

    const aboutRetailTitle = 'About Retail Outlet';
    const aboutRetail = `Proposed site the Retail Outlet situated at Plot no.${selectedSurvey?.plotNo} Khata no. ${selectedSurvey?.khataNo}. Ch.${selectedSurvey?.plotChainageNumber}.${selectedSurvey?.plotPlacementA} (${selectedSurvey?.plotSide}), ${selectedSurvey?.cityTowardsLeft} to ${selectedSurvey?.cityTowardsRight}, On ${selectedSurvey?.highwayType}-${selectedSurvey?.highwayNo}, City- ${selectedSurvey?.city}, District- ${selectedSurvey?.district}, State- ${selectedSurvey?.state}.Plot ( size 60m x 60m) which is in confirmation to the Ministry of Road Transport and Highways Norms dated 24.07.2013 & its subsequent amendment via circular no. RW-NH-33032/01/2017- S&R (R) Dated 26th June 2020. 26.06.2020 and other mandatory features have been shown as below:`;

    const disclaimerTitle = 'Disclaimer';
    const disclaimerData = 'The report has been generated as per the information given by you (user of this website) and comparing the same date with the Minister of Road transport and Highways guideline No. RW-NH-33032/01/2017-S&R(R) Dt: 26th June, 2020 in good faith and for general information purpose only. This website or this computer generated report does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (nhaccesspermission.com), is strictly at your own risk will not be liable for any losses and/or damages in connection with the use of our website.';

    const siteTitle = 'Site Report:';
    const siteData = `The site of the proposed/Existing retail outlet over Plot No.${selectedSurvey?.plotNo} Khata No.${selectedSurvey?.khataNo}. Mouza/Village, Tahasil, District ${selectedSurvey?.district}, State ${selectedSurvey?.state} at Chainage ${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementA} to ${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementB} on ${selectedSurvey?.highwayType}-${selectedSurvey?.highwayNo}, ${selectedSurvey?.plotSide} of ${selectedSurvey?.oilCompanyName} ${this.compliance ? 'is' : 'not'} in confirmation to the Ministry of Road Transport and Highways Norms dated 24.07.2013 & its subsequent amendment via circular no. RW-NH-33032/01/2017- S&R (R) Dated 26th June 2020. 26.06.2020 and other mandatory features have been shown as below:`;

    const roadLeftPhoto = new Image();
    roadLeftPhoto.crossOrigin = "";
    roadLeftPhoto.src = `${selectedSurvey?.roadLeftPhoto || './assets/noImage.png'}`;
    const roadRightPhoto = new Image();
    roadRightPhoto.crossOrigin = "";
    roadRightPhoto.src = `${selectedSurvey?.roadRightPhoto || './assets/noImage.png'}`; 
    const surveyDiagram = new Image();
    surveyDiagram.src = `${selectedSurvey?.surveyDiagram || './assets/noImage.png'}`; 

    const leftImageData = `Location of proposed Retail outlet Ch.${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementA} to ${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementB} (${selectedSurvey?.plotSide}), ${selectedSurvey?.cityTowardsLeft} to ${selectedSurvey?.cityTowardsRight}, On ${selectedSurvey?.highwayType}-${selectedSurvey?.highwayNo}, Village/Mouza- , Tehsil- , District- ${selectedSurvey?.district}, State- ${selectedSurvey?.state}.
    \nLeft hand side Picture of site- \nLatitude: ${selectedSurvey?.latLeft} \nLongitude:${selectedSurvey?.longLeft}`;
    const rightImageData = `Location of proposed Retail outlet Ch.${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementA} to ${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementB} (${selectedSurvey?.plotSide}), ${selectedSurvey?.cityTowardsLeft} to ${selectedSurvey?.cityTowardsRight}, On ${selectedSurvey?.highwayType}-${selectedSurvey?.highwayNo}, Village/Mouza- , Tehsil- , District- ${selectedSurvey?.district}, State- ${selectedSurvey?.state}.
    \nRight hand side Picture of site- \nLatitude:${selectedSurvey?.latRight} \nLongitude:${selectedSurvey?.longRight}`;

    const highwayNormText = `National Highway Stipulated Norms for Fuel station on existing Service road at ${this.stretchType}:`;
    const highwayNormText2 = `National Highway Stipulated Norms for Fuel station on ${this.stretchType}:`;

    const feasibilityText = `The Site is ${this.compliance ? '' : 'not'} feasible for setting up of CNG / Retail outlet as per MoRT&H guidelines. However the Decision of Highway administration is final.`;
    const morthText = `This is a preliminary auto generated report as per the data given by the user and comparing the same with the MORTH guideline. This website or the owner of website no way responsible for the final decision of the Highway authority.`;

    const tempDate = new Date();
    const today = `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()}`;
    const dated = 'Dated : ' + today;

    const doc = new jspdf('p', 'px', 'a4'); //Generates PDF in portrait mode
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const maxPageWidth = pageWidth - 60;
    // doc.setFont('Lato-Regular', 'normal');

    // page-1
    //doc.setFontSize(11); doc.text(toData, 30, 30); //ToData
    // doc.setFontSize(22); doc.text(title, pageWidth / 2, pageHeight / 4, { align: 'center' });

    //doc.setFontSize(11); doc.text(subTitle, 40, pageHeight / 4 + 30, { align: 'justify', maxWidth: maxPageWidth - 30, lineHeightFactor: 1.5 });
    //doc.setFontSize(11); doc.text(footer, 30, pageHeight - 70, { align: 'left', maxWidth: maxPageWidth });

    //doc.addPage(); //page-2
    doc.setFontSize(18); doc.text(title, pageWidth / 2, 80, { align: 'center', maxWidth: maxPageWidth - 30, lineHeightFactor: 1.5 });

    // Disclaimer
    doc.setFontSize(18); doc.text(disclaimerTitle, 30, 120, { align: 'justify', maxWidth: maxPageWidth - 30, lineHeightFactor: 1.5 });
    const disclaimerTitleWidth = doc.getTextWidth(disclaimerTitle);
    doc.setLineWidth(2);
    doc.line(30, 123, 30 + disclaimerTitleWidth, 123);
    doc.setFontSize(13); doc.text(disclaimerData, 30, 140, { align: 'justify', maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

    // About Company
    doc.setFontSize(18); doc.text(aboutCompanyTitle, 30, 270, { align: 'justify', maxWidth: maxPageWidth - 30, lineHeightFactor: 1.5 });
    const aboutCompanyTitleWidth = doc.getTextWidth(aboutCompanyTitle);
    doc.setLineWidth(2);
    doc.line(30, 273, 30 + aboutCompanyTitleWidth, 273);
    doc.setFontSize(13); doc.text(aboutCompany, 30, 290, { align: 'justify', maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

    doc.addPage(); //page-3
    doc.setFontSize(18); doc.text(siteTitle, 30, 40, { align: 'justify', maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
    doc.setFontSize(13); doc.text(siteData, 30, 60, { align: 'justify', maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

    autoTable(doc, {
      body: [
        ['1.', selectedSurvey?.highwayType, selectedSurvey?.highwayNo],
        ['2', 'State', selectedSurvey?.state],
        ['3', 'District', selectedSurvey?.district],
        ['4', 'Location', selectedSurvey?.city],
        ['5', 'Chainage in KM', `${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementA} to ${selectedSurvey?.plotChainageNumber}:${selectedSurvey?.plotPlacementB}`],
        ['6', 'Oil Company Name', selectedSurvey?.oilCompanyName],
        ['7', 'Latitude and Longitude of RHS', `${selectedSurvey?.latLeft}, ${selectedSurvey?.longLeft}`],
        ['8', 'Latitude and Longitude of LHS', `${selectedSurvey?.latRight}, ${selectedSurvey?.longRight}`],
        // ...
      ],
      margin: { top: 150 },
    })

    // doc.setFontSize(13); doc.text(siteData, 30, 320, { align: 'justify', maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

    doc.setFontSize(13); doc.text(leftImageData, 30, 310, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
    doc.addImage(roadLeftPhoto, 'JPEG', 30, 390, maxPageWidth, roadLeftPhoto.height);

    doc.addPage(); //page-4

    doc.setFontSize(13); doc.text(rightImageData, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
    doc.addImage(roadRightPhoto, 'JPEG', 30, 140, maxPageWidth , roadRightPhoto.height);

    doc.addPage(); //page-5

    if (this.condition1 || this.condition2) {
      doc.setFontSize(13); doc.text(highwayNormText, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

      autoTable(doc, {
        head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
        body: [
          ['1.', 'Width or Frontage of the plot', '35m', `${selectedSurvey?.plotWidth}`, `${this.plotWidthNorm ? 'YES' : 'NO'}`],
          ['2.', 'Depth of the plot from Road ROW', '35m', `${selectedSurvey?.plotDepth}`, `${this.plotDepthNorm ? 'YES' : 'NO'}`]
          // ...
        ],
        margin: { top: 60 },
      })

      doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      
    //   doc.addPage(); //page-5
    //  doc.addImage(surveyDiagram, 'JPEG', 30, 40, maxPageWidth, roadRightPhoto.height);
    }

    else if (this.condition3 || this.condition4) {
      doc.setFontSize(13); doc.text(highwayNormText, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

      autoTable(doc, {
        head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
        body: [
          ['1.', 'Width or Frontage of the plot', '35m', `${selectedSurvey?.plotWidth}`, `${this.plotWidthNorm ? 'YES' : 'NO'}`],
          ['2.', 'Depth of the plot from Road ROW', '35m', `${selectedSurvey?.plotDepth}`, `${this.plotDepthNorm ? 'YES' : 'NO'}`]
          // ...
        ],
        margin: { top: 60 },
      })

      doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      
    //   doc.addPage(); //page-5
    //  doc.addImage(surveyDiagram, 'JPEG', 30, 40, maxPageWidth, roadRightPhoto.height);
    }
    else if (this.condition5) {
      doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

      autoTable(doc, {
        head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
        body: [
          ['1.', 'Width or Frontage of the plot', '35m', `${selectedSurvey?.plotWidth}`, `${this.plotWidthNorm ? 'YES' : 'NO'}`],
          ['2.', 'Depth of the plot from Road ROW', '35m', `${selectedSurvey?.plotDepth}`, `${this.plotDepthNorm ? 'YES' : 'NO'}`],
          ['3.', 'Intersection with any category of road', 'Minimum 300m', `${intersectionList[0]?.imageDistance}`, `${intersectionList[0]?.imageDistance >= 300 ? 'YES' : 'NO'}`],
          ['4.', 'Median Gap', 'Minimum 300m', `${medianGapList[0]?.imageDistance}`, `${medianGapList[0]?.imageDistance >= 300 ? 'YES' : 'NO'}`],
          ['5.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance}`, `${this.checkBarrierCondition ? 'YES' : 'NO'}`],
          ['6.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance}`, `${tollPlazaList[0]?.imageDistance >= 300 ? 'YES' : 'NO'}`],
          ['7.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance}`, `${this.railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
          ['8.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance}`, `${this.roadOverBridgeCondition ? 'YES' : 'NO'}`],
          ['9.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance}`, `${this.gradeSeperatorCondition ? 'YES' : 'NO'}`],
          ['10.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance}`, `${this.roadUnderBridgeCondition ? 'YES' : 'NO'}`],
          ['11.', 'Nearest Fuel station on either side of the road', 'Minimum 1000m', `${fuelStationList[0]?.imageDistance}`, `${this.fuelStationCondition ? 'YES' : 'NO'}`]
          // ...
        ],
        margin: { top: 60 },
      })

      doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      
    //   doc.addPage(); //page-5
    //  doc.addImage(surveyDiagram, 'JPEG', 30, 40, maxPageWidth, roadRightPhoto.height);
    }
    else if (this.condition6) {
      doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

      autoTable(doc, {
        head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
        body: [
          ['1.', 'Width or Frontage of the plot', '20m', `${selectedSurvey?.plotWidth}`, `${this.plotWidthNorm ? 'YES' : 'NO'}`],
          ['2.', 'Depth of the plot from Road ROW', '20m', `${selectedSurvey?.plotDepth}`, `${this.plotDepthNorm ? 'YES' : 'NO'}`],
          ['3.', 'Intersection with any category of road', 'Minimum 100m', `${intersectionList[0]?.imageDistance || "NA"}`, `${this.intersectionCondition ? 'YES' : 'NO'}`],
          ['4.', 'Median Gap', 'Minimum 100m', `${medianGapList[0]?.imageDistance || "NA"}`, `${this.medianGapCondition ? 'YES' : 'NO'}`],
          ['5.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance || "NA"}`, `${this.checkBarrierCondition ? 'YES' : 'NO'}`],
          ['6.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance || "NA"}`, `${this.tollPlazaCondition ? 'YES' : 'NO'}`],
          ['7.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance || "NA"}`, `${this.railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
          ['8.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance || "NA"}`, `${this.roadOverBridgeCondition ? 'YES' : 'NO'}`],
          ['9.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance || "NA"}`, `${this.gradeSeperatorCondition ? 'YES' : 'NO'}`],
          ['10.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance || "NA"}`, `${this.roadUnderBridgeCondition ? 'YES' : 'NO'}`],
          ['11.', 'Nearest Fuel station on either side of the road', 'Minimum 300m', `${fuelStationList[0]?.imageDistance || "NA"}`, `${this.fuelStationCondition ? 'YES' : 'NO'}`]
          // ...
        ],
        margin: { top: 60 },
      })

      doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      
    //   doc.addPage(); //page-5
    //  doc.addImage(surveyDiagram, 'JPEG', 30, 40, maxPageWidth, roadRightPhoto.height);
    }
    else if (this.condition7) {
      doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

      autoTable(doc, {
        head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
        body: [
          ['1.', 'Width or Frontage of the plot', '35m', `${selectedSurvey?.plotWidth}`, `${this.plotWidthNorm ? 'YES' : 'NO'}`],
          ['2.', 'Depth of the plot from Road ROW', '35m', `${selectedSurvey?.plotDepth}`, `${this.plotDepthNorm ? 'YES' : 'NO'}`],
          ['3.', 'Intersection with any category of road', 'Minimum 300m', `${intersectionList[0]?.imageDistance || "NA"}`, `${this.intersectionCondition ? 'YES' : 'NO'}`],
          ['4.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance || "NA"}`, `${this.checkBarrierCondition ? 'YES' : 'NO'}`],
          ['5.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance || "NA"}`, `${this.tollPlazaCondition ? 'YES' : 'NO'}`],
          ['6.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance || "NA"}`, `${this.railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
          ['7.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance || "NA"}`, `${this.roadOverBridgeCondition ? 'YES' : 'NO'}`],
          ['8.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance || "NA"}`, `${this.gradeSeperatorCondition ? 'YES' : 'NO'}`],
          ['9.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance || "NA"}`, `${this.roadUnderBridgeCondition ? 'YES' : 'NO'}`],
          ['10.', 'Nearest Fuel station on either side of the road', 'Minimum 300m', `${fuelStationList[0]?.imageDistance || "NA"}`, `${this.fuelStationCondition ? 'YES' : 'NO'}`]
          // ...
        ],
        margin: { top: 60 },
      })

      doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

    //   doc.addPage(); //page-5
    //  doc.addImage(surveyDiagram, 'JPEG', 30, 40, maxPageWidth, roadRightPhoto.height);
    }
    else {
      doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });

      autoTable(doc, {
        head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
        body: [
          ['1.', 'Width or Frontage of the plot', '20m', `${selectedSurvey?.plotWidth}`, `${this.plotWidthNorm ? 'YES' : 'NO'}`],
          ['2.', 'Depth of the plot from Road ROW', '20m', `${selectedSurvey?.plotDepth}`, `${this.plotDepthNorm ? 'YES' : 'NO'}`],
          ['3.', 'Intersection with any category of road', 'Minimum 100m', `${intersectionList[0]?.imageDistance || "NA"}`, `${this.intersectionCondition ? 'YES' : 'NO'}`],
          ['4.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance || "NA"}`, `${this.checkBarrierCondition ? 'YES' : 'NO'}`],
          ['5.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance || "NA"}`, `${this.tollPlazaCondition ? 'YES' : 'NO'}`],
          ['6.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance || "NA"}`, `${this.railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
          ['7.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance || "NA"}`, `${this.roadOverBridgeCondition ? 'YES' : 'NO'}`],
          ['8.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance || "NA"}`, `${this.gradeSeperatorCondition ? 'YES' : 'NO'}`],
          ['9.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance || "NA"}`, `${this.roadOverBridgeCondition ? 'YES' : 'NO'}`],
          ['10.', 'Nearest Fuel station on either side of the road', 'Minimum 300m', `${fuelStationList[0]?.imageDistance || "NA"}`, `${this.fuelStationCondition ? 'YES' : 'NO'}`]
          // ...
        ],
        margin: { top: 60 },
      })

      doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
      
      // doc.addPage(); //page-5
      // doc.addImage(surveyDiagram, 'JPEG', 30, 40, maxPageWidth, roadRightPhoto.height);
    }


    // var imgData = 'data:image/jpeg;base64,'+ Base64.encode(`${selectedSurvey?.roadLeftPhoto}`);
    // console.log(imgData);
    // doc.addImage(`${selectedSurvey?.roadLeftPhoto}`, 'JPEG', 15, 40, 180, 160);
    // doc.output('datauri');

    // console.log(this.plotWidthNorm, "this.plotWidthNorm");

    // pdf.autoTable({html:"#exportfrontpageTable",startY:doc.autoTable.previous.finalY + 1115});
    doc.save('SurveyData.pdf');

  }

  /**
   * @function: handleEditSurvey
   * @description: This function handles the click for edit of the survey details
   * @param: selectedSurvey, event
   * @returns: void
   */
  handleEditSurvey(selectedSurvey: SurveyListDatatype, event: Event): void {
    event.stopPropagation();

    if (selectedSurvey.id.length) {

      this.surveylistService.getSurveyDetails(selectedSurvey.id)
        .pipe(
          take(1),
          mergeMap((surveyData: Record<string, any>) => {

              if(surveyData.data.roadLeftPhoto && surveyData.data.roadRightPhoto){
                this.surveylistService.fetchImageFromServer(surveyData.data.roadLeftPhoto, surveyData.data.roadRightPhoto)
                .pipe(
                  take(1)
                ).subscribe( (imageBlobData: any) => {
                  const leftImagename = surveyData.data.roadLeftPhoto.substring(surveyData.data.roadLeftPhoto.lastIndexOf('/'), 
                                                                                surveyData.data.roadLeftPhoto.lastIndexOf('.'));
                  const rightImagename = surveyData.data.roadRightPhoto.substring(surveyData.data.roadRightPhoto.lastIndexOf('/'), 
                                                                                  surveyData.data.roadRightPhoto.lastIndexOf('.'));

                  surveyData.data.roadLeftPhoto = new File([imageBlobData[0]], leftImagename, { type: 'image/jpeg' });
                  surveyData.data.roadRightPhoto = new File([imageBlobData[1]], rightImagename, { type: 'image/jpeg' });
                  
                  // save the survey details in the subject for access in survey section.
                  this.dataService.resetSurveyData(surveyData.data);

                  of('').pipe(delay(200)).subscribe( () => this.router.navigate(['../user/survey']));
                });
              }
              else{
                  // save the survey details in the subject for access in survey section.
                  this.dataService.resetSurveyData(surveyData.data);
                  return of('');
              }

              return of();
          })
        ,delay(200)
        )
        .subscribe( () => this.router.navigate(['../user/survey']));

    }
  }




}

