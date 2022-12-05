/**
 * @file: user-logged-info.service.ts
 * @description: this file is used for handling logged in user information
 * @author: Asish Das
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, mergeMap, take, delay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class UserLoggedInfoService {

  userInfoObs: Observable<any>;
  userInfoSubject: BehaviorSubject<any>;
  
  constructor() {
    this.userInfoSubject = new BehaviorSubject(null);
    this.userInfoObs = this.userInfoSubject.asObservable();

  }

  /**
   * @function: saveAccessToken
   * @description: This function saves the access token in local storage
   * @param: tokenInfo
   * @returns: void
   */
  saveAccessToken(tokenInfo: any): void {
    if (this.checkStorageInformation('localStorage')){
      localStorage.setItem('app_aid', tokenInfo);
    }
  }

  /**
   * @function: saveRefreshToken
   * @description: This function saves the refresh token in local storage
   * @param: tokenInfo
   * @returns: void
   */
  saveRefreshToken(tokenInfo: any): void {
    if (this.checkStorageInformation('localStorage')){
      localStorage.setItem('app_rid', tokenInfo);
    }
  }

  /**
   * @function: checkStorageInformation
   * @description: This function checks if storage is available by the browser
   * @param: type
   * @returns: boolean
   */
  checkStorageInformation(type: string): boolean {
    let storage: any;
    let storeData: string;
  
    // Try to set data inside the type of storage got in argument.
    // If success remove the data and return true for storage available
    // else show error message and return false for storage unavailable.
    try {
        storage = window[type];
        storeData = '__storage_test__';
        storage.setItem(storeData, storeData);
        storage.removeItem(storeData);
        return true;
    }
    catch (e) {
        console.log('Enable' + type + ' of browser to use application');

        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }

  /**
   * @function: saveUserInfo
   * @description: This function saves the user information in behaviour subject
   *               so that its accessible thoughout the application.
   * @param: userData 
   * @returns: void
   */
  saveUserInfo(tokenInfo: string | null): boolean {

    var status: boolean = true;
    try{
      if(tokenInfo){
        const userInfo = jwt_decode(tokenInfo);
        this.userInfoSubject.next(userInfo);
      }
      else{
        status = false;
        this.logoutUser();
      }
    }
    catch(a){
      status = false;
    }

   return status;
  }

  /**
   * @function: isUserLoggedIn
   * @description: This function checks if the user is logged in or not
   * @param: null 
   * @returns: observable boolean
   */
  isUserLoggedIn(): boolean {
    let isLogged: boolean = false;

    if(this.checkStorageInformation('localStorage') && localStorage.length && localStorage.getItem('app_aid')){

      this.userInfoObs
      .subscribe( (userInfo) => {
        if(userInfo !== null){
          isLogged = true;
        }
      });
    }

    return isLogged;
  }

  /**
   * @function: getUserType
   * @description: This function checks if the user is authrorized or not
   * @param: null 
   * @returns: observable string
   */
  getUserType(): number {

    let role: number = -1;

    this.userInfoObs
    .subscribe( (userInfo) => {
      if(userInfo !== null){
        role = userInfo['user_type'];
      }
    });

    return role;
  }

  /**
   * @function: logoutUser
   * @description: This function clears the local storage and subject.
   * @param: null 
   * @returns: void
   */
  logoutUser(): void {
    localStorage.removeItem('app_rid');
    localStorage.removeItem('app_aid');
    this.userInfoSubject.next(null);
  }

}
