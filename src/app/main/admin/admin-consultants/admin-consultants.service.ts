/**
 * @file: admin-consultants.service.ts
 * @description: This file handles the http requests for admin consultants.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })
 export class AdminConsultantsService {
 
   constructor( private http: HttpClient) { }
 
   /**
    * @function: getConsultantsList
    * @description: This functions calls http for getting the consultants for the list
    * @param: null
    * @returns: Observable
    */
   getConsultantsList(): Observable<any>{
      return this.http.get(`${environment.adminUrl}/consultant/`);
   }

   /**
    * @function: deleteConsultant
    * @description: This functions calls http for adding new consultant data
    * @param: addConsultantFormData
    * @returns: Observable
    */
    deleteConsultant(selectedConsultant: string): Observable<any>{
      return this.http.delete(`${environment.adminUrl}/consultant/${selectedConsultant}/`);
   }

   /**
    * @function: updateConsultant
    * @description: This functions calls http for updating consultant data
    * @param: updateConsultantFormData
    * @returns: Observable
    */
    updateConsultant(updateConsultantFormData: FormData, selectedConsultant: string): Observable<any>{
      return this.http.put(`${environment.adminUrl}/consultant/${selectedConsultant}/`, updateConsultantFormData);
   }

   /**
    * @function: addConsultant
    * @description: This functions calls http for adding new consultant data
    * @param: addConsultantFormData
    * @returns: Observable
    */
    addConsultant(addConsultantFormData: FormData): Observable<any>{
      return this.http.post(`${environment.adminUrl}/consultant/`, addConsultantFormData);
   }

 }
 