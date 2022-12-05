/**
 * @file: admin-dashboard.service.ts
 * @description: This file handles the http requests for admin dashboard.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })

 export class AdminDashboardService {
 
   constructor( private http: HttpClient) { }
 
   /**
    * @function: getDashboardSummaryDetails
    * @description: This functions calls http for getting the dashboard summary details
    * @param: null
    * @returns: Observable
    */
   getDashboardSummaryDetails(): Observable<any>{
     return this.http.get(`${environment.adminUrl}/dashboard/`);
   }

   /**
    * @function: getDashboardTableDetails
    * @description: This functions calls http for getting the dashboard table details
    * @param: null
    * @returns: Observable
    */
    getDashboardTableDetails(): Observable<any>{
      return this.http.get(`${environment.adminUrl}/dashboard/`);
    }

 }
 