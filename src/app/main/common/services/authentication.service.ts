/**
 * @file: authentication.service.ts
 * @description: This file is used for handling all authentication related functionality
 * @author: Asish Das
 */
 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })
 
 export class AuthenticationService {

    constructor(private http: HttpClient) {

    }

    /**
     * @function: RefreshToken
     * @description: This function refreshes the access token
     * @param: null
     * @returns: Observable 
    */
    refreshToken(): Observable<any> {
        return this.http.get(`${environment.apiUrl}user/refresh_token/`);
    }

    /**
     * @function: Login
     * @description: This function refreshes the access token
     * @param: null
     * @returns: Observable
    */
    login(userLoginForm: FormData): Observable<any> {
        return this.http.post(`${environment.apiUrl}user/login/`, userLoginForm);
    }

    /**
     * @function: Logout
     * @description: This function refreshes the access token
     * @param: null
     * @returns: Observable
    */
    logout(userInfo: FormData): Observable<any> {
        return this.http.post(`${environment.apiUrl}user/logout/`, userInfo);
    }

    /**
     * @function: AdminLogin
     * @description: This function refreshes the access token
     * @param: null
     * @returns: Observable
    */
     adminLogin(userLoginForm: FormData): Observable<any> {
        return this.http.post(`${environment.adminUrl}/login/`, userLoginForm);
    }

    /**
     * @function: AdminLogout
     * @description: This function refreshes the access token
     * @param: null
     * @returns: Observable
    */
     adminLogout(userInfo: FormData): Observable<any> {
        return this.http.post(`${environment.adminUrl}/logout/`, userInfo);
    }

 }