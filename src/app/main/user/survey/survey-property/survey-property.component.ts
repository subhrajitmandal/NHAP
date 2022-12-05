/**
 * @file: survey-property.component.ts
 * @description: This is the survey property form
 * @author: Asish Das
 */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SurveyDataHandlerService } from '../survey-data-handler.service';
import { take, mergeMap, delay } from 'rxjs/operators';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { SurveyService } from '../survey.service';
import { stateListData } from 'src/app/main/common/models/survey.model';

@Component({
  selector: 'app-survey-property',
  templateUrl: './survey-property.component.html',
  styleUrls: ['./survey-property.component.scss']
})

export class SurveyPropertyComponent implements OnInit {

  @ViewChild('diagram', {read: ElementRef}) diagram!: ElementRef;
  surveyPropertyForm: FormGroup;
  lat: number;
  lng: number;
  zoom: number;
  origin: number;
  destination: number;
  stateList: Array<Record<string, any>>;
  districts: Array<any>;
  longLeft: number;
  latLeft: number;

  constructor(private fbuilder: FormBuilder,
    private surveyDataService: SurveyDataHandlerService,
    private readonly geolocation$: GeolocationService,
    private surveyService: SurveyService) {

      this.stateList = stateListData;
      this.lat = 0;
      this.lng = 0;
      this.zoom = 0;
      this.origin = 0;
      this.destination = 0;
      this.districts = [];
      this.longLeft = 0;
      this.latLeft = 0;

    this.surveyPropertyForm = this.fbuilder.group({
      propertyType: ['1'],
      highwayType: ['NH', [Validators.required]],
      highwayNo: ['', [Validators.required]],
      ownerName: ['', [Validators.pattern('[a-zA-Z ]*')]],
      plotNo: [''],
      khataNo: [''],
      city: ['', [Validators.pattern('[a-zA-Z ]*')]],
      district: [''],
      state: [''],
      oilCompanyName: [''],
      cityTowardsLeft: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cityTowardsRight: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      longLeft: [''],
      latLeft: [''],
      longRight: [''],
      latRight: ['']
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
      .subscribe((data) => {
        for (const formKey in this.surveyPropertyForm.controls) {
          if (formKey && data[formKey]?.length) {
            
            this.surveyPropertyForm.get([formKey])?.patchValue(data[formKey]);
            
            if(formKey === 'state'){
              this.changeState(data[formKey]);
            }
          }
        }
      });

    // On any value change in the form it is actively updated for the image section to take effect
    this.surveyPropertyForm.valueChanges
      .subscribe(() => {
        this.surveyDataService.setStepFormData(this.surveyPropertyForm.controls);
      });
  }

  changeState(state: any) {
    this.districts = this.stateList.find(st => st.state == state)?.districts;
    // console.log(this.districts, this.stateList, "this.districts")
  }

  getLeftCoordinates() {
    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.surveyPropertyForm.get('latLeft')?.patchValue(position.coords.latitude);
      this.surveyPropertyForm.get('longLeft')?.patchValue(position.coords.longitude);
    }
    );
  }

  // getLeftCoordinates() {
  //   // get Users current position
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.latLeft = position.coords.latitude;
  //       this.longLeft = position.coords.longitude;
  //       this.zoom = 16;
  //       console.log("position", position, this.lat, this.lng)
  //       this.surveyPropertyForm.get('longLeft')?.patchValue(position.coords.longitude);
  //       this.surveyPropertyForm.get('latLeft')?.patchValue(position.coords.latitude);
  //     });
  //   } else {
  //     console.log("User not allowed")
  //   }
  // }

  getRightCoordinates() {
    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.surveyPropertyForm.get('latRight')?.patchValue(position.coords.latitude);
      this.surveyPropertyForm.get('longRight')?.patchValue(position.coords.longitude);
    }
    );
  }

  /**
   * @function: submitProperty
   * @description: This function submits the property form data to be stored in behavior subject
   * @param: null
   * @returns: void
   */
  submitProperty(): void {

    if (!this.surveyPropertyForm.invalid) {
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
          mergeMap( (surveyData) => {
            for(const formKey in surveyData){
              if(formKey){
                draftFormData.append(formKey, surveyData[formKey]);
              }
            }
            draftFormData.append('is_draft', 'true');
            draftFormData.append('stepNo', '1');
            draftFormData.append('drag_drop', JSON.stringify([]));
    
            // return this.surveyService.createSurvey(draftFormData);

            if (surveyData.id) {
              return this.surveyService.saveDraft(draftFormData, surveyData.id);
            } else {
              return this.surveyService.createSurvey(draftFormData);
            }

          })
        )
        .subscribe( (draftDetails: Record<string, any>) => {

            this.surveyDataService.setStepFormData(this.surveyPropertyForm.controls, undefined, draftDetails.data.id);
        });
      });
    }
  }


}
