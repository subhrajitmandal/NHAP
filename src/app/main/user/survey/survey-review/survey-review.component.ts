import { delay, take } from 'rxjs/operators';
import { SurveyDataHandlerService } from './../survey-data-handler.service';
import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-survey-review',
  templateUrl: './survey-review.component.html',
  styleUrls: ['./survey-review.component.scss']
})

export class SurveyReviewComponent implements OnInit {

  surveyFormData: Record<string, any>;
  data: any;
  roadLeftPhoto = new Image();
  roadRightPhoto = new Image();
  surveyDiagram = new Image();

  constructor(private surveyDataService: SurveyDataHandlerService) {
    this.surveyFormData = {};
  }

  /**
   * @function: ngOnInit
   * @description: This function gets the survey data from subject and load the images if present.
   * @param: null
   * @returns: void
  */
  ngOnInit(): void {

    this.surveyDataService.surveyDataObs
      .pipe(
        take(1)
      )
      .subscribe((surveyData) => {
        
        for (const formKey in surveyData) {
          if (formKey) {
            this.surveyFormData[formKey] = surveyData[formKey];

            // Fetch the left and right image for export
            if(formKey === 'roadLeftPhoto'){

              if(this.surveyFormData?.roadLeftPhoto){
                const reader = new FileReader();
                reader.readAsDataURL(this.surveyFormData?.roadLeftPhoto);
                reader.onload = (imgResult) =>{
                  this.roadLeftPhoto.src = imgResult.target?.result ? imgResult.target?.result.toString() : './assets/noImage.png';
                };
              }
              else{
                this.roadLeftPhoto.src = './assets/noImage.png';
              }
            }

            if(formKey === 'roadRightPhoto'){

              if(this.surveyFormData?.roadRightPhoto){
                const reader = new FileReader();
                reader.readAsDataURL(this.surveyFormData?.roadRightPhoto);
                reader.onload = (imgResult) =>{
                  this.roadRightPhoto.src = imgResult.target?.result ? imgResult.target?.result.toString() : './assets/noImage.png';
                };
              }
              else{
                this.roadRightPhoto.src = './assets/noImage.png';
              }
            }
          }
        }
      });

      // Fetch the survey diagram image
      this.surveyDataService.surveyDiagramObs
      .subscribe( (image: any) => {
        if(image){
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (imgResult) =>{
            this.surveyDiagram.src = imgResult.target?.result ? imgResult.target?.result.toString() : './assets/noImage.png';
          };
        }
        else{
          this.surveyDiagram.src = './assets/noImage.png';
        }

      });
  }

  /**
   * @function: exportAsPDF
   * @description: This function creates the pdf doc and saves it in the subject to be used for downloading survey pdf later.
   * @param: null
   * @returns: void 
  */
  exportAsPDF() {

    let plotWidthNorm: boolean = false;
    let plotDepthNorm: boolean = false;
    let intersectionCondition: boolean = true;
    let checkBarrierCondition: boolean = true;
    let tollPlazaCondition: boolean = true;
    let railwayLevelCrossingCondition: boolean = true;
    let roadOverBridgeCondition: boolean = true;
    let gradeSeperatorCondition: boolean = true;
    let roadUnderBridgeCondition: boolean = true;
    let fuelStationCondition: boolean = true;
    let medianGapCondition: boolean = true;

    let compliance: boolean = true;

    let stretchType: string = '';

     const condition1 = this.surveyFormData.roadType == "1" && this.surveyFormData.locationType == "2" && this.surveyFormData.serviceRoad == "1";
     const condition2 = this.surveyFormData.roadType == "2" && this.surveyFormData.locationType == "2" && this.surveyFormData.serviceRoad == "1";
     const condition3 = this.surveyFormData.roadType == "1" && this.surveyFormData.locationType == "1" && this.surveyFormData.serviceRoad == "1";
     const condition4 = this.surveyFormData.roadType == "2" && this.surveyFormData.locationType == "1" && this.surveyFormData.serviceRoad == "1";
     const condition5 = this.surveyFormData.roadType == "2" && this.surveyFormData.locationType == "2" && this.surveyFormData.serviceRoad == "0";
     const condition6 = this.surveyFormData.roadType == "2" && this.surveyFormData.locationType == "1" && this.surveyFormData.serviceRoad == "0";
     const condition7 = this.surveyFormData.roadType == "1" && this.surveyFormData.locationType == "2" && this.surveyFormData.serviceRoad == "0";
     const condition8 = this.surveyFormData.roadType == "1" && this.surveyFormData.locationType == "1" && this.surveyFormData.serviceRoad == "0";
 
     const drag_drop = JSON.parse(this.surveyFormData.dragDrop);
 
 
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
 
     if (condition1) {
       stretchType = 'Rural Stretch';
       plotWidthNorm = this.surveyFormData.plotWidth >= "35";
       plotDepthNorm = this.surveyFormData.plotDepth >= "35";
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm;
     }
     else if (condition2) {
       stretchType = 'Rural Stretch';
       plotWidthNorm = this.surveyFormData.plotWidth >= "35";
       plotDepthNorm = this.surveyFormData.plotDepth >= "35";
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm;
     }
     else if (condition3) {
       stretchType = 'Urban Stretch';
       plotWidthNorm = this.surveyFormData.plotWidth >= "35";
       plotDepthNorm = this.surveyFormData.plotDepth >= "35";
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm;
     }
     else if (condition4) {
       stretchType = 'Urban Stretch';
       plotWidthNorm = this.surveyFormData.plotWidth >= "35";
       plotDepthNorm = this.surveyFormData.plotDepth >= "35";
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm;
     }
     else if (condition5) {
       stretchType = 'Rural Stretch Divided carriage way';
 
       plotWidthNorm = this.surveyFormData.plotWidth >= "35";
       plotDepthNorm = this.surveyFormData.plotDepth >= "35";
 
       // IntersectionCondition
       if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 300 || intersectionList[0]?.imageDistance == undefined) {
         if(intersectionList[0]?.imageWidth == 1 && intersectionList[0]?.roadLength == 1){
           intersectionCondition = false;
         }else{
           intersectionCondition = true;
         }
       }
       else {
         intersectionCondition = false
       }
 
       // MedianGapCondition
       if (medianGapList[0]?.imageDistance && medianGapList[0]?.imageDistance >= 300 || medianGapList[0]?.imageDistance == undefined) {
         medianGapCondition = true
       }
       else {
         medianGapCondition = false
       }
 
       // CheckBarrierCondition
       if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
         checkBarrierCondition = true
       }
       else {
         checkBarrierCondition = false
       }
 
       // TollPlazaCondition
       if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
         tollPlazaCondition = true
       }
       else {
         tollPlazaCondition = false
       }
 
       // railwayLevelCrossingCondition
       if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
         railwayLevelCrossingCondition = true
       }
       else {
         railwayLevelCrossingCondition = false
       }
 
       // RoadOverBridgeCondition
       if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
         roadOverBridgeCondition = true
       }
       else {
         roadOverBridgeCondition = false
       }
 
       // GradeSeperatorCondition
       if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
         gradeSeperatorCondition = true
       }
       else {
         gradeSeperatorCondition = false
       }
 
       // RoadUnderBridgeCondition
       if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
         roadUnderBridgeCondition = true
       }
       else {
         roadUnderBridgeCondition = false
       }
 
       // FuelStationCondition
       if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 1000 || fuelStationList[0]?.imageDistance == undefined) {
         fuelStationCondition = true
       }
       else {
         fuelStationCondition = false
       }
 
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm && medianGapCondition && intersectionCondition && checkBarrierCondition && tollPlazaCondition && railwayLevelCrossingCondition && roadOverBridgeCondition
         && gradeSeperatorCondition && roadOverBridgeCondition && fuelStationCondition;
 
     }
     else if (condition6) {
       stretchType = 'Urban Stretch Divided carriage way';
 
       plotWidthNorm = this.surveyFormData.plotWidth >= "20";
       plotDepthNorm = this.surveyFormData.plotDepth >= "20";
 
       // IntersectionCondition
       if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 100 || intersectionList[0]?.imageDistance == undefined) {
         intersectionCondition = true
       }
       else {
         intersectionCondition = false
       }
 
       // MedianGapCondition
       if (medianGapList[0]?.imageDistance && medianGapList[0]?.imageDistance >= 100 || medianGapList[0]?.imageDistance == undefined) {
         intersectionCondition = true
       }
       else {
         intersectionCondition = false
       }
 
       // CheckBarrierCondition
       if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
         checkBarrierCondition = true
       }
       else {
         checkBarrierCondition = false
       }
 
       // TollPlazaCondition
       if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
         tollPlazaCondition = true
       }
       else {
         tollPlazaCondition = false
       }
 
       // railwayLevelCrossingCondition
       if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
         railwayLevelCrossingCondition = true
       }
       else {
         railwayLevelCrossingCondition = false
       }
 
       // RoadOverBridgeCondition
       if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
         roadOverBridgeCondition = true
       }
       else {
         roadOverBridgeCondition = false
       }
 
       // GradeSeperatorCondition
       if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
         gradeSeperatorCondition = true
       }
       else {
         gradeSeperatorCondition = false
       }
 
       // RoadUnderBridgeCondition
       if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
         roadUnderBridgeCondition = true
       }
       else {
         roadUnderBridgeCondition = false
       }
 
       // FuelStationCondition
       if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 300 || fuelStationList[0]?.imageDistance == undefined) {
         fuelStationCondition = true
       }
       else {
         fuelStationCondition = false
       }
 
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm && medianGapCondition && intersectionCondition && checkBarrierCondition && tollPlazaCondition && railwayLevelCrossingCondition && roadOverBridgeCondition
         && gradeSeperatorCondition && roadOverBridgeCondition && fuelStationCondition;
 
     }
     else if (condition7) {
       stretchType = 'Rural Stretch Undivided carriage way';
 
       plotWidthNorm = this.surveyFormData.plotWidth >= "35";
       plotDepthNorm = this.surveyFormData.plotDepth >= "35";
 
       // IntersectionCondition
       if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 300 || intersectionList[0]?.imageDistance == undefined) {
         intersectionCondition = true
       }
       else {
         intersectionCondition = false
       }
 
       // CheckBarrierCondition
       if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
         checkBarrierCondition = true
       }
       else {
         checkBarrierCondition = false
       }
 
       // TollPlazaCondition
       if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
         tollPlazaCondition = true
       }
       else {
         tollPlazaCondition = false
       }
 
       // railwayLevelCrossingCondition
       if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
         railwayLevelCrossingCondition = true
       }
       else {
         railwayLevelCrossingCondition = false
       }
 
       // RoadOverBridgeCondition
       if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
         roadOverBridgeCondition = true
       }
       else {
         roadOverBridgeCondition = false
       }
 
       // GradeSeperatorCondition
       if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
         gradeSeperatorCondition = true
       }
       else {
         gradeSeperatorCondition = false
       }
 
       // RoadUnderBridgeCondition
       if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
         roadUnderBridgeCondition = true
       }
       else {
         roadUnderBridgeCondition = false
       }
 
       // FuelStationCondition
       if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 300 || fuelStationList[0]?.imageDistance == undefined) {
         fuelStationCondition = true
       }
       else {
         fuelStationCondition = false
       }
 
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm && intersectionCondition && checkBarrierCondition && tollPlazaCondition && railwayLevelCrossingCondition && roadOverBridgeCondition
         && gradeSeperatorCondition && roadOverBridgeCondition && fuelStationCondition;
     }
     else {
       stretchType = 'Urban Stretch Undivided carriage way';
 
       plotWidthNorm = this.surveyFormData.plotWidth >= "20";
       plotDepthNorm = this.surveyFormData.plotDepth >= "20";
 
       // IntersectionCondition
       if (intersectionList[0]?.imageDistance && intersectionList[0]?.imageDistance >= 100 || intersectionList[0]?.imageDistance == undefined) {
         intersectionCondition = true
       }
       else {
         intersectionCondition = false
       }
 
       // CheckBarrierCondition
       if (checkBarrierList[0]?.imageDistance && checkBarrierList[0]?.imageDistance >= 1000 || checkBarrierList[0]?.imageDistance == undefined) {
         checkBarrierCondition = true
       }
       else {
         checkBarrierCondition = false
       }
 
       // TollPlazaCondition
       if (tollPlazaList[0]?.imageDistance && tollPlazaList[0]?.imageDistance >= 1000 || tollPlazaList[0]?.imageDistance == undefined) {
         tollPlazaCondition = true
       }
       else {
         tollPlazaCondition = false
       }
 
       // railwayLevelCrossingCondition
       if (railwayLevelCrossingList[0]?.imageDistance && railwayLevelCrossingList[0]?.imageDistance >= 1000 || railwayLevelCrossingList[0]?.imageDistance == undefined) {
         railwayLevelCrossingCondition = true
       }
       else {
         railwayLevelCrossingCondition = false
       }
 
       // RoadOverBridgeCondition
       if (roadOverBridgeList[0]?.imageDistance && roadOverBridgeList[0]?.imageDistance >= 200 || roadOverBridgeList[0]?.imageDistance == undefined) {
         roadOverBridgeCondition = true
       }
       else {
         roadOverBridgeCondition = false
       }
 
       // GradeSeperatorCondition
       if (gradeSeperatorList[0]?.imageDistance && gradeSeperatorList[0]?.imageDistance >= 300 || gradeSeperatorList[0]?.imageDistance == undefined) {
         gradeSeperatorCondition = true
       }
       else {
         gradeSeperatorCondition = false
       }
 
       // RoadUnderBridgeCondition
       if (roadUnderBridgeList[0]?.imageDistance && roadUnderBridgeList[0]?.imageDistance >= 300 || roadUnderBridgeList[0]?.imageDistance == undefined) {
         roadUnderBridgeCondition = true
       }
       else {
         roadUnderBridgeCondition = false
       }
 
       // FuelStationCondition
       if (fuelStationList[0]?.imageDistance && fuelStationList[0]?.imageDistance >= 300 || fuelStationList[0]?.imageDistance == undefined) {
         fuelStationCondition = true
       }
       else {
         fuelStationCondition = false
       }
 
       // Compliance
       compliance = plotWidthNorm && plotDepthNorm && intersectionCondition && checkBarrierCondition && tollPlazaCondition && railwayLevelCrossingCondition && roadOverBridgeCondition
         && gradeSeperatorCondition && roadOverBridgeCondition && fuelStationCondition;
 
     }
 
     // plotWidthNorm = this.surveyFormData.plotWidth >= "35";
     // plotDepthNorm = this.surveyFormData.plotDepth >= "35";
     // const plotWidthNorm2 = this.surveyFormData.plotWidth >= "20";
     // const plotDepthNorm2 = this.surveyFormData.plotDepth >= "20";
 

 
 
     var pdf = new jspdf('p', 'mm', 'a4');
     // let PDFdata = document.getElementById('PDFcontent')!;
 
     const toData =
       `To,
      State Head
      Reliance BP Mobility Ltd Bhubaneswar,
      Odisha`;
     const title = 'FEASIBILITY REPORT';
     const subTitle = `Feasibility Report for Proposal of MS/HSD Retail Outlet at Plot no.${this.surveyFormData?.plotNo} Khata no. ${this.surveyFormData?.khataNo}. Ch.${this.surveyFormData?.plotChainageNumber}.${this.surveyFormData?.plotPlacementA} (${this.surveyFormData?.plotSide}), ${this.surveyFormData?.cityTowardsLeft} to ${this.surveyFormData?.cityTowardsRight}, On ${this.surveyFormData?.highwayType}-${this.surveyFormData?.highwayNo}, City- ${this.surveyFormData?.city}, District- ${this.surveyFormData?.district}, State- ${this.surveyFormData?.state}`;
     const footer =
       ' Consultant: \n 3D ViSiON \n Plot.No. 4707/5004, \n Adimata Colony, Gadakana, Bhubaneswar-17 \n E-mail: admin@3dvision.co.in Tel No: 674, 2748127 \n Mob: 8270009000';
 
     const aboutCompanyTitle = 'About NH Access Permission';
     const aboutCompany = 'The persons or entities requiring an access to a National Highway, shall submit a self-certified proposal for obtaining access permission to the concerned Authority, to whom such Highway is entrusted, (i.e. The project Director of the National Highways Authority of India/General manager or Deputy General Manager of the National Highway Infrastructural Development Corporation Limited / Executive Engineer of the National Highway Wing of the State Public Work Departments). \n\nOn receiving the documents and after checking the same, if the authority finds the documents are in order as per the Ministry guide line, may give the Provisional NOC for construction of Access to the property. \n \nOn completion of access to the property as per the Provisional NOC the persons or entities can apply to the Highway Administration for granting final NOC.';
 
     const aboutRetailTitle = 'About Retail Outlet';
     const aboutRetail = `Proposed site the Retail Outlet situated at Plot no.${this.surveyFormData?.plotNo} Khata no. ${this.surveyFormData?.khataNo}. Ch.${this.surveyFormData?.plotChainageNumber}.${this.surveyFormData?.plotPlacementA} (${this.surveyFormData?.plotSide}), ${this.surveyFormData?.cityTowardsLeft} to ${this.surveyFormData?.cityTowardsRight}, On ${this.surveyFormData?.highwayType}-${this.surveyFormData?.highwayNo}, City- ${this.surveyFormData?.city}, District- ${this.surveyFormData?.district}, State- ${this.surveyFormData?.state}.Plot ( size 60m x 60m) which is in confirmation to the Ministry of Road Transport and Highways Norms dated 24.07.2013 & its subsequent amendment via circular no. RW-NH-33032/01/2017- S&R (R) Dated 26th June 2020. 26.06.2020 and other mandatory features have been shown as below:`;
 
     const disclaimerTitle = 'Disclaimer';
     const disclaimerData = 'The report has been generated as per the information given by you (user of this website) and comparing the same date with the Minister of Road transport and Highways guideline No. RW-NH-33032/01/2017-S&R(R) Dt: 26th June, 2020 in good faith and for general information purpose only. This website or this computer generated report does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (nhaccesspermission.com), is strictly at your own risk will not be liable for any losses and/or damages in connection with the use of our website.';
 
     const siteTitle = 'Site Report:';
     const siteData = `The site of the proposed/Existing retail outlet over Plot No.${this.surveyFormData?.plotNo} Khata No.${this.surveyFormData?.khataNo}. Mouza/Village, Tahasil, District ${this.surveyFormData?.district}, State ${this.surveyFormData?.state} at Chainage ${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementA} to ${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementB} on ${this.surveyFormData?.highwayType}-${this.surveyFormData?.highwayNo}, ${this.surveyFormData?.plotSide} of ${this.surveyFormData?.oilCompanyName} ${compliance ? 'is' : 'not'} in confirmation to the Ministry of Road Transport and Highways Norms dated 24.07.2013 & its subsequent amendment via circular no. RW-NH-33032/01/2017- S&R (R) Dated 26th June 2020. 26.06.2020 and other mandatory features have been shown as below:`; 
 
     const leftImageData = `Location of proposed Retail outlet Ch.${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementA} to ${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementB} (${this.surveyFormData?.plotSide}), ${this.surveyFormData?.cityTowardsLeft} to ${this.surveyFormData?.cityTowardsRight}, On ${this.surveyFormData?.highwayType}-${this.surveyFormData?.highwayNo}, Village/Mouza- , Tehsil- , District- ${this.surveyFormData?.district}, State- ${this.surveyFormData?.state}.
     \nLeft hand side Picture of site- \nLatitude: ${this.surveyFormData?.latLeft} \nLongitude:${this.surveyFormData?.longLeft}`;
     const rightImageData = `Location of proposed Retail outlet Ch.${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementA} to ${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementB} (${this.surveyFormData?.plotSide}), ${this.surveyFormData?.cityTowardsLeft} to ${this.surveyFormData?.cityTowardsRight}, On ${this.surveyFormData?.highwayType}-${this.surveyFormData?.highwayNo}, Village/Mouza- , Tehsil- , District- ${this.surveyFormData?.district}, State- ${this.surveyFormData?.state}.
     \nRight hand side Picture of site- \nLatitude:${this.surveyFormData?.latRight} \nLongitude:${this.surveyFormData?.longRight}`;
 
     const highwayNormText = `National Highway Stipulated Norms for Fuel station on existing Service road at ${stretchType}:`;
     const highwayNormText2 = `National Highway Stipulated Norms for Fuel station on ${stretchType}:`;
 
     const feasibilityText = `The Site is ${compliance ? '' : 'not'} feasible for setting up of CNG / Retail outlet as per MoRT&H guidelines. However the Decision of Highway administration is final.`;
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
         ['1.', this.surveyFormData?.highwayType, this.surveyFormData?.highwayNo],
         ['2', 'State', this.surveyFormData?.state],
         ['3', 'District', this.surveyFormData?.district],
         ['4', 'Location', this.surveyFormData?.city],
         ['5', 'Chainage in KM', `${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementA} to ${this.surveyFormData?.plotChainageNumber}:${this.surveyFormData?.plotPlacementB}`],
         ['6', 'Oil Company Name', this.surveyFormData?.oilCompanyName],
         ['7', 'Latitude and Longitude of RHS', `${this.surveyFormData?.latLeft}, ${this.surveyFormData?.longLeft}`],
         ['8', 'Latitude and Longitude of LHS', `${this.surveyFormData?.latRight}, ${this.surveyFormData?.longRight}`],
         // ...
       ],
       margin: { top: 150 },
     })
 
     // doc.setFontSize(13); doc.text(siteData, 30, 320, { align: 'justify', maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
     doc.setFontSize(13); doc.text(leftImageData, 30, 310, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
     doc.addImage(this.roadLeftPhoto, 'JPEG', 30, 390, maxPageWidth, this.roadLeftPhoto.height);
 
     doc.addPage(); //page-4
 
     doc.setFontSize(13); doc.text(rightImageData, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
     doc.addImage(this.roadRightPhoto, 'JPEG', 30, 140, maxPageWidth , this.roadRightPhoto.height);
 
     doc.addPage(); //page-5
 
     if (condition1 || condition2) {
       doc.setFontSize(13); doc.text(highwayNormText, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
       autoTable(doc, {
         head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
         body: [
           ['1.', 'Width or Frontage of the plot', '35m', `${this.surveyFormData?.plotWidth}`, `${plotWidthNorm ? 'YES' : 'NO'}`],
           ['2.', 'Depth of the plot from Road ROW', '35m', `${this.surveyFormData?.plotDepth}`, `${plotDepthNorm ? 'YES' : 'NO'}`]
           // ...
         ],
         margin: { top: 60 },
       })
 
       doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       
      //  doc.addPage(); //page-5
      // doc.addImage(this.surveyDiagram, 'JPEG', 30, 40, maxPageWidth, this.surveyDiagram.height);
     }
 
     else if (condition3 || condition4) {
       doc.setFontSize(13); doc.text(highwayNormText, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
       autoTable(doc, {
         head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
         body: [
           ['1.', 'Width or Frontage of the plot', '35m', `${this.surveyFormData?.plotWidth}`, `${plotWidthNorm ? 'YES' : 'NO'}`],
           ['2.', 'Depth of the plot from Road ROW', '35m', `${this.surveyFormData?.plotDepth}`, `${plotDepthNorm ? 'YES' : 'NO'}`]
           // ...
         ],
         margin: { top: 60 },
       })
 
       doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       
      //  doc.addPage(); //page-5
      // doc.addImage(this.surveyDiagram, 'JPEG', 30, 40, maxPageWidth, this.surveyDiagram.height);
     }
     else if (condition5) {
       doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
       autoTable(doc, {
         head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
         body: [
           ['1.', 'Width or Frontage of the plot', '35m', `${this.surveyFormData?.plotWidth}`, `${plotWidthNorm ? 'YES' : 'NO'}`],
           ['2.', 'Depth of the plot from Road ROW', '35m', `${this.surveyFormData?.plotDepth}`, `${plotDepthNorm ? 'YES' : 'NO'}`],
           ['3.', 'Intersection with any category of road', 'Minimum 300m', `${intersectionList[0]?.imageDistance}`, `${intersectionList[0]?.imageDistance >= 300 ? 'YES' : 'NO'}`],
           ['4.', 'Median Gap', 'Minimum 300m', `${medianGapList[0]?.imageDistance}`, `${medianGapList[0]?.imageDistance >= 300 ? 'YES' : 'NO'}`],
           ['5.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance}`, `${checkBarrierCondition ? 'YES' : 'NO'}`],
           ['6.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance}`, `${tollPlazaList[0]?.imageDistance >= 300 ? 'YES' : 'NO'}`],
           ['7.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance}`, `${railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
           ['8.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance}`, `${roadOverBridgeCondition ? 'YES' : 'NO'}`],
           ['9.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance}`, `${gradeSeperatorCondition ? 'YES' : 'NO'}`],
           ['10.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance}`, `${roadUnderBridgeCondition ? 'YES' : 'NO'}`],
           ['11.', 'Nearest Fuel station on either side of the road', 'Minimum 1000m', `${fuelStationList[0]?.imageDistance}`, `${fuelStationCondition ? 'YES' : 'NO'}`]
           // ...
         ],
         margin: { top: 60 },
       })
 
       doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       
      //  doc.addPage(); //page-5
      // doc.addImage(this.surveyDiagram, 'JPEG', 30, 40, maxPageWidth, this.surveyDiagram.height);
     }
     else if (condition6) {
       doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
       autoTable(doc, {
         head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
         body: [
           ['1.', 'Width or Frontage of the plot', '20m', `${this.surveyFormData?.plotWidth}`, `${plotWidthNorm ? 'YES' : 'NO'}`],
           ['2.', 'Depth of the plot from Road ROW', '20m', `${this.surveyFormData?.plotDepth}`, `${plotDepthNorm ? 'YES' : 'NO'}`],
           ['3.', 'Intersection with any category of road', 'Minimum 100m', `${intersectionList[0]?.imageDistance || "NA"}`, `${intersectionCondition ? 'YES' : 'NO'}`],
           ['4.', 'Median Gap', 'Minimum 100m', `${medianGapList[0]?.imageDistance || "NA"}`, `${medianGapCondition ? 'YES' : 'NO'}`],
           ['5.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance || "NA"}`, `${checkBarrierCondition ? 'YES' : 'NO'}`],
           ['6.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance || "NA"}`, `${tollPlazaCondition ? 'YES' : 'NO'}`],
           ['7.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance || "NA"}`, `${railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
           ['8.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance || "NA"}`, `${roadOverBridgeCondition ? 'YES' : 'NO'}`],
           ['9.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance || "NA"}`, `${gradeSeperatorCondition ? 'YES' : 'NO'}`],
           ['10.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance || "NA"}`, `${roadUnderBridgeCondition ? 'YES' : 'NO'}`],
           ['11.', 'Nearest Fuel station on either side of the road', 'Minimum 300m', `${fuelStationList[0]?.imageDistance || "NA"}`, `${fuelStationCondition ? 'YES' : 'NO'}`]
           // ...
         ],
         margin: { top: 60 },
       })
 
       doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       
      //  doc.addPage(); //page-5
      // doc.addImage(this.surveyDiagram, 'JPEG', 30, 40, maxPageWidth, this.surveyDiagram.height);
     }
     else if (condition7) {
       doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
       autoTable(doc, {
         head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
         body: [
           ['1.', 'Width or Frontage of the plot', '35m', `${this.surveyFormData?.plotWidth}`, `${plotWidthNorm ? 'YES' : 'NO'}`],
           ['2.', 'Depth of the plot from Road ROW', '35m', `${this.surveyFormData?.plotDepth}`, `${plotDepthNorm ? 'YES' : 'NO'}`],
           ['3.', 'Intersection with any category of road', 'Minimum 300m', `${intersectionList[0]?.imageDistance || "NA"}`, `${intersectionCondition ? 'YES' : 'NO'}`],
           ['4.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance || "NA"}`, `${checkBarrierCondition ? 'YES' : 'NO'}`],
           ['5.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance || "NA"}`, `${tollPlazaCondition ? 'YES' : 'NO'}`],
           ['6.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance || "NA"}`, `${railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
           ['7.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance || "NA"}`, `${roadOverBridgeCondition ? 'YES' : 'NO'}`],
           ['8.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance || "NA"}`, `${gradeSeperatorCondition ? 'YES' : 'NO'}`],
           ['9.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance || "NA"}`, `${roadUnderBridgeCondition ? 'YES' : 'NO'}`],
           ['10.', 'Nearest Fuel station on either side of the road', 'Minimum 300m', `${fuelStationList[0]?.imageDistance || "NA"}`, `${fuelStationCondition ? 'YES' : 'NO'}`]
           // ...
         ],
         margin: { top: 60 },
       })
 
       doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
      //  doc.addPage(); //page-5
      // doc.addImage(this.surveyDiagram, 'JPEG', 30, 40, maxPageWidth, this.surveyDiagram.height);
     }
     else {
       doc.setFontSize(13); doc.text(highwayNormText2, 30, 40, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
 
       autoTable(doc, {
         head: [['Sl.No.', 'Description', 'MORTH Norm', 'At Site', 'Compliance']],
         body: [
           ['1.', 'Width or Frontage of the plot', '20m', `${this.surveyFormData?.plotWidth}`, `${plotWidthNorm ? 'YES' : 'NO'}`],
           ['2.', 'Depth of the plot from Road ROW', '20m', `${this.surveyFormData?.plotDepth}`, `${plotDepthNorm ? 'YES' : 'NO'}`],
           ['3.', 'Intersection with any category of road', 'Minimum 100m', `${intersectionList[0]?.imageDistance || "NA"}`, `${intersectionCondition ? 'YES' : 'NO'}`],
           ['4.', 'Distance from Check barrier', 'Minimum 1000m', `${checkBarrierList[0]?.imageDistance || "NA"}`, `${checkBarrierCondition ? 'YES' : 'NO'}`],
           ['5.', 'Toll Plaza', 'Minimum 1000m', `${tollPlazaList[0]?.imageDistance || "NA"}`, `${tollPlazaCondition ? 'YES' : 'NO'}`],
           ['6.', 'Railway level crossing', 'Minimum 1000m', `${railwayLevelCrossingList[0]?.imageDistance || "NA"}`, `${railwayLevelCrossingCondition ? 'YES' : 'NO'}`],
           ['7.', 'Distance from start of approach road of Road Over Bridge', 'Minimum 200m', `${roadOverBridgeList[0]?.imageDistance || "NA"}`, `${roadOverBridgeCondition ? 'YES' : 'NO'}`],
           ['8.', 'Distance from start of Grade Separator', 'Minimum 300m', `${gradeSeperatorList[0]?.imageDistance || "NA"}`, `${gradeSeperatorCondition ? 'YES' : 'NO'}`],
           ['9.', 'Distance from start of Flyover', 'Minimum 300m', `${roadUnderBridgeList[0]?.imageDistance || "NA"}`, `${roadOverBridgeCondition ? 'YES' : 'NO'}`],
           ['10.', 'Nearest Fuel station on either side of the road', 'Minimum 300m', `${fuelStationList[0]?.imageDistance || "NA"}`, `${fuelStationCondition ? 'YES' : 'NO'}`]
           // ...
         ],
         margin: { top: 60 },
       })
 
       doc.setFontSize(13); doc.text(feasibilityText, 30, 260, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       doc.setFontSize(13); doc.text(morthText, 30, 300, { maxWidth: maxPageWidth, lineHeightFactor: 1.5 });
       
      //  doc.addPage(); //page-5
      //  doc.addImage(this.surveyDiagram, 'JPEG', 30, 40, maxPageWidth, this.surveyDiagram.height);
     }

     this.surveyDataService.setPdfData(doc);
  }

}
