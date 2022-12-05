/**
 * @file: admin-users.service.ts
 * @description: This file handles the http requests for admin users.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })

 export class AdminUsersService {
 
   constructor( private http: HttpClient) { }
 
  /**
    * @function: getadminUsersList
    * @description: This functions calls http for getting user details for table
    * @param: null
    * @returns: Observable
  */
  getadminUsersList(): Observable<any>{
      return this.http.get(`${environment.adminUrl}/user/`);
  }

  /**
    * @function: updateWalletBalance
    * @description: This functions calls http for updating the wallet balance for user
    * @param: userWalletFormData
    * @returns: Observable
  */
  updateWalletBalance(userWalletFormData: FormData): Observable<any>{
      return this.http.post(`${environment.adminUrl}/addmoney/`, userWalletFormData);
   }

  /**
    * @function: updateUserDetails
    * @description: This functions calls http for updating the user details
    * @param: userDetailsFormData
    * @returns: Observable
  */
  updateUserDetails(userDetailsFormData: FormData, selectedUser: string): Observable<any>{
      return this.http.put(`${environment.adminUrl}/user/${selectedUser}/`, userDetailsFormData);
  }

  /**
    * @function: deleteUser
    * @description: This functions calls http for deleting the user selected
    * @param: userDeleteFormData
    * @returns: Observable
  */
  deleteUser(selectedUser: string): Observable<any>{
      return this.http.delete(`${environment.adminUrl}/user/${selectedUser}/`);
  }

  /**
    * @function: addUsers
    * @description: This functions calls http for adding a new user
    * @param: addUserFormData
    * @returns: Observable
  */
  addUsers(addUserFormData: FormData): Observable<any>{
      return this.http.post(`${environment.adminUrl}/user/`, addUserFormData);
  }

 }
 