/**
 * @file: authentication.service.ts
 * @description: This file is used for handling spinner loading
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })
 
 export class SpinnerLoaderService {

    isLoadingSubject: BehaviorSubject<boolean>;
    isLoadingObs: Observable<boolean>;

    constructor() {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSubject.asObservable();
    }

    /**
     * @function: showLoader
     * @description: This function displays the http loader
     * @param: null
     * @returns: void
    */
    showLoader(): void {
        this.isLoadingSubject.next(true);
    }

    /**
     * @function: hideLoader
     * @description: This function hides the http loader
     * @param: null
     * @returns: void
    */
    hideLoader(): void {
        this.isLoadingSubject.next(false);
    }

}