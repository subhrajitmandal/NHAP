/***
 * @file: token.interceptor.ts
 * @description: This is a http interceptor file which add headers to each http request before making actual request to server
 * @author: Asish Das
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    /**
     * @function: intercept
     * @description: This function intercepts the request and add headers to the http request.
     * @param: request
     * @param: next
     * @returns: Observable<HTTPEvent<any>>
     */

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Skip sending the authorization header in login and register
        if( request.url.toUpperCase().indexOf('LOGIN') === -1 && 
            request.url.toUpperCase().indexOf('LOGOUT') === -1 && 
            request.url.toUpperCase().indexOf('REGISTER') === -1 &&
            request.url.toUpperCase().indexOf('VERIFY_PHONE_EMAIL') === -1 &&
            request.url.toUpperCase().indexOf('RESEND_PHONE_OTP') === -1 &&
            request.url.toUpperCase().indexOf('RESEND_EMAIL_OTP') === -1 &&
            request.url.toUpperCase().indexOf('FORGOTPASSWORD') === -1 &&
            request.url.toUpperCase().indexOf('VERIFY_FORGETPASSWORD_OTP') === -1 &&
            request.url.toUpperCase().indexOf('RESEND_FORGETPASSWORD_OTP') === -1 &&
            request.url.toUpperCase().indexOf('USER/CONSULTANT') === -1 && 
            request.url.toUpperCase().indexOf('MEDIA') === -1
            ){

            request = request.clone({
                setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('app_aid')}`
                            }
               // ,withCredentials: true // Enable this line to send the refresh cookie.
                
            });
        }
        return next.handle(request);
    
    }
}
