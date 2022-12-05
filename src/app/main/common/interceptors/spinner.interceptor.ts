/***
 * @file spinner.interceptor.ts
 * @description This is a http interceptor file which add headers to each http request before making actual request to server
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerLoaderService } from '../services/spinner-loader.service';
 
@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    
    constructor(private spinnerService: SpinnerLoaderService) {

    }
    /**
     * @function intercept
     * @param request
     * @param next
     * @description This function intercepts the request and add headers to the http request.
     * @returns Observable<HTTPEvent<any>>
     */

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(request.url.toUpperCase().indexOf('USER/SURVEY') !== -1 && request.method === 'GET'){
            //Show the spinner
            this.spinnerService.showLoader();
        }
        
        return next.handle(request)
        .pipe(
            finalize(() => {
                //Hide the spinner
                this.spinnerService.hideLoader();
            })
        );
    
    }
 
}
