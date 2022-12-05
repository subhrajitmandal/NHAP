/**
 * @file: signup.service.ts
 * @description: This file handles the http calls for sign up section.
 * @author: Asish Das
 */
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  /**
   * @function: sendMobileOtp
   * @description: This function call http to send otp to user mobile.
   * @param: mobileData
   * @returns: observable
   */
  sendMobileOtp(mobileData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/resend_phone_otp/`, mobileData);
  }

  /**
   * @function: sendEmailOtp
   * @description: This function calls the http to send otp to user email
   * @param: emailData
   * @returns: observable
   */
  sendEmailOtp(emailData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/resend_email_otp/`, emailData);
  }

  /**
   * @function: signUpSubmit
   * @description: This function calls the http to send sign up form
   * @param: signUpData
   * @returns: observable
   */
  signUpSubmit(signUpData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/register/`, signUpData);
  }

  /**
   * @function: verifySubmit
   * @description: This function calls the http to send sign up form
   * @param: signUpData
   * @returns: observable
   */
   verifySubmit(verifyData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/verify_phone_email/`, verifyData);
  }
}
