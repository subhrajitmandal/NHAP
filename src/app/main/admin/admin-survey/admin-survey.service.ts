/**
 * @file: admin-survey.service.ts
 * @description: This file handles the http requests for admin survey.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })
 export class AdminSurveyService {
 
   constructor( private http: HttpClient) { }
 
   /**
    * @function: validateLogin
    * @description: This functions calls http for getting all survey list
    * @param: null
    * @returns: Observable
    */
   getSurveyList(): Observable<any>{
     return this.http.get(`${environment.adminUrl}/survey/`);
   }
 }
 