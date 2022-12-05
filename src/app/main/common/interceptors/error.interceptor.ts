/***
 * @file        -httpError.interceptor.ts
 * @author      -Asish Das
 * @description -This is a http interceptor file which handles http error according to http error status 
 */

 import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
 import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
 import { catchError, switchMap, filter, take } from 'rxjs/operators';
 import { Router } from '@angular/router';
 import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserLoggedInfoService } from '../services/user-logged-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
 
 @Injectable({
     providedIn: 'root'
   })
 
 export class HTTPErrorInterceptor implements HttpInterceptor {
     private isTokenRefreshing: boolean;
     private isRefreshTokenData: BehaviorSubject<any>;
     
     constructor(
                  private router: Router,
                  private authenticationService: AuthenticationService,
                  private userService: UserLoggedInfoService,
                  private notification: MatSnackBar
               ) {
         this.isTokenRefreshing = false;
         this.isRefreshTokenData = new BehaviorSubject<any>(null);
     }
 
     /**
      * @function    -intercept
      * @param       -request
      * @param       -next
      * @description -This function intercepts the http request and handles the http error.
      * @returns     -Observable<any>
      */
     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

         return next.handle(request).pipe(catchError((error) => {

             if (error instanceof HttpErrorResponse && 
                     request.url.toUpperCase().indexOf('LOGIN') === -1 && 
                     request.url.toUpperCase().indexOf('REGISTER') === -1 &&
                     request.url.toUpperCase().indexOf('VERIFY_PHONE_EMAIL') === -1 &&
                     request.url.toUpperCase().indexOf('RESEND_PHONE_OTP') === -1 &&
                     request.url.toUpperCase().indexOf('RESEND_EMAIL_OTP') === -1) {
                 switch (error.status) {
                     case 401 :  // INAUTHORIZED USER OR TOKEN ERROR.

                        // If encountered error in refreshing token then move to logout.
                        if(request.url.toUpperCase().indexOf('REFRESH_TOKEN') !== -1)
                        {
                            this.isTokenRefreshing = false;
                            this.isRefreshTokenData.next(null);
                            this.userService.logoutUser();
                            this.router.navigate(['login']);
                            return of();
                        }

                         // Used error.statusText as the error.message was appending extra information as well.
                         // Changes to use of error.error.message as in Dev and prod the statustext was not returning error.
                         if (error.error.messages[0].message.toUpperCase().indexOf('TOKEN') !== -1) {

                             // If token is not refreshing then only proceed to refresh
                             if (!this.isTokenRefreshing) {
                                 this.isTokenRefreshing = true;
                                 this.isRefreshTokenData.next(null);

                                 // Send a http request to refresh the access token using refresh token.
                                  return this.authenticationService.refreshToken().pipe(
                                     switchMap((token: any) => {

                                        // If token is fetched then save it in the local storage
                                        // Update the token data in the current user info subject.
                                        this.isTokenRefreshing = false;
                                        this.isRefreshTokenData.next(token.data);
                                     //   const valid = this.userService.saveUserInfo(status.access);
                                     //   this.userService.saveAccessToken(status.access);

                                        // Use the new access token to continue on the actual old request.
                                        request = request.clone({
                                            setHeaders : {authorization: `Bearer ${token.data}`}
                                        });
                                        return next.handle(request);
                                   })
                                 );
                             }
                             else {
                                 // If token is in the process of refreshing then continue the request.
                                 return this.isRefreshTokenData.pipe(
                                     filter((token) => token != null),
                                     take(1),
                                     switchMap(() => next.handle(request))
                                 );
                             }
                         }
                         else {
                             this.isTokenRefreshing = false;
                             this.isRefreshTokenData.next(null);
                             if (error.error.messages.toString().toUpperCase().indexOf('INVALID') === -1) {
                                //  this._dialogService.open({
                                //      section: 'Error',
                                //      message: error.error.messages.toString(),
                                //      dialogType: 'error'
                                //  });
 
                                //  this._dialogService.close()
                                //  .subscribe( () => {
                                //      this._currentUserInfoService.logout();
                                //      this._router.navigate(['/login']);
                                //  });
                             }
                             return of();
                         }
                         break;
 
                     case 400 :  // INVALID FORM OR BAD REQUEST
                        //  this._dialogService.open({
                        //      section: 'Error',
                        //      message: 'Form is not valid',
                        //      dialogType: 'error'
                        //  });
                         break;
                        
                     case 403 :  // UNAUTHORIZED ACCESS
                        //  this._dialogService.open({
                        //      section: 'Error',
                        //      message: 'User is not authorized for this',
                        //      dialogType: 'error'
                        //  });
                         break;
                         
                     case 500 :  // INTERNAL SERVER ERROR
                        //  this._dialogService.open({
                        //      section: 'Error',
                        //      message: error.error.messages.toString(),
                        //      dialogType: 'error'
                        //  });
                         break;
 
                     case 422:   // VALIDATION ERROR TO BE HANDLED AT COMPONENT SIDE
                         break;
 
                     case 501:   // STATUS NOT IMPLEMENTED FOR COMPANY USER LOGIN
                         break;
 
                     default  : // Default error message handler.
                         this.notification.open('Some Error Occurred', 'Ok', {duration: 2500});
                         
                         break;
                                
                 }    
             }
             return throwError(error);  
         }));
     }
 }
 
