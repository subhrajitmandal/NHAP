/**
 * @file: survey-upload-diagram.service.ts
 * @description: This is the survey interaction between multiple components
 * @author: Asish Das
 */
 import { BehaviorSubject, Observable } from 'rxjs';
 import { Injectable } from '@angular/core';
 
 @Injectable({
   providedIn: 'root'
 })
 
 export class SurveyUploadDiagramService {
 
   public isIntersectionObs: Observable<any>;
   public isResetFormObs: Observable<any>;
   public imageUploadDiagramObs: Observable<any>;

   private isIntersectionSubject: BehaviorSubject<any>;
   private isResetFormSubject: BehaviorSubject<any>;
   private imageUploadDiagramSubject: BehaviorSubject<Array<Record<string, any>>>;

 
   constructor() {
     this.isIntersectionSubject = new BehaviorSubject(null);
     this.isResetFormSubject = new BehaviorSubject(null);
     this.imageUploadDiagramSubject = new BehaviorSubject<Array<Record<string, any>>>([]);

     this.isIntersectionObs = this.isIntersectionSubject.asObservable();
     this.isResetFormObs = this.isResetFormSubject.asObservable();
     this.imageUploadDiagramObs = this.imageUploadDiagramSubject.asObservable();
   }

  /**
   * @function: setIntersectionStatus
   * @description: This sets the check for intersection in subject
   * @param: isIntersection
   * @return: void
  */
   setIntersectionStatus(isIntersection: boolean): void {
      this.isIntersectionSubject.next(isIntersection);
   }

  /**
   * @function: setFormInitialisationStatus
   * @description: This sets the initialisation of form in subject
   * @param: formImageData
   * @return: void
  */
   setFormInitialisationStatus(formImageData: Record<string, any>): void {

      this.isResetFormSubject.next(formImageData);
   }

  /**
   * @function: setImageUploadDiagram
   * @description: This sets the upload images of array in subject
   * @param: diagramDetails
   * @return: void
  */
   setImageUploadDiagram(diagramDetails: Array<Record<string, any>>): void {
      this.imageUploadDiagramSubject.next(diagramDetails);
   }

 }
 