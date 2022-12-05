/**
 * @file: login.service.ts
 * @description: This file handles the http requests for login.
 * @author: Asish Das
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../common/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private authenticationServie: AuthenticationService) { }

  /**
   * @function: validateLogin
   * @description: This functions calls http for validating login for user.
   * @param: loginData
   * @returns: Observable
   */
  validateLogin(loginData: FormData): Observable<any>{
    return this.authenticationServie.login(loginData);
  }
  /**
   * @function: validateAdminLogin
   * @description: This functions calls http for validating login for user.
   * @param: loginData
   * @returns: Observable
   */
   validateAdminLogin(loginData: FormData): Observable<any>{
    return this.authenticationServie.adminLogin(loginData);
  }
}
