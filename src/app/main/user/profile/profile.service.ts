/**
 * @file: profile.service.ts
 * @description: This retrieves the user profile
 * @author: Asish Das
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor( private http: HttpClient) { }

  /**
   * @function: getUserProfile
   * @description: This functions calls http for validating login for user.
   * @param: loginData
   * @returns: Observable
   */
  getUserProfile(): Observable<any>{
    return this.http.get(`${environment.apiUrl}user/profile/`);
  }
}