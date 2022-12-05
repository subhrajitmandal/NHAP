/**
 * @file: forgot-password.service.ts
 * @description: This file handles the http requests for forgot password.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })

 export class ForgotPasswordService {
 
   constructor( private http: HttpClient) { }
 
   /**
    * @function: sendPhoneOtp
    * @description: This function sends phone otp
    * @param: phoneOtpForm
    * @returns: Observable
    */
    sendPhoneOtp(phoneOtpForm: FormData): Observable<any>{
        return this.http.post(`${environment.apiUrl}sendPhoneOtp`, phoneOtpForm);
    }

   /**
    * @function: sendEmailOtp
    * @description: This function sends email otp
    * @param: emailOtpForm
    * @returns: Observable
    */
    resend_forgetpassword_otp(emailOtpForm: FormData): Observable<any>{
        return this.http.post(`${environment.apiUrl}user/resend_forgetpassword_otp/`, emailOtpForm);
    }

    /**
    * @function: validateUser
    * @description: This function validates the user
    * @param: validateUserForm
    * @returns: Observable
    */
    validateUser(validateUserForm: FormData): Observable<any>{
        return this.http.post(`${environment.apiUrl}user/forgotpassword/`, validateUserForm);
    }

    /**
    * @function: validateForgotPasswordOtp
    * @description: This function validates the otp
    * @param: emailOtpForm
    * @returns: Observable
    */
    validateForgotPasswordOtp(validateUserForm: FormData): Observable<any>{
        return this.http.post(`${environment.apiUrl}user/verify_forgetpassword_otp/`, validateUserForm);
    }

    /**
    * @function: changePassword
    * @description: This function changes the password of the user 
    * @param: passwordForm
    * @returns: Observable
    */
    changePassword(passwordForm: FormData): Observable<any>{
        return this.http.post(`${environment.apiUrl}user/reset_password/`, passwordForm);
    }

 }
 