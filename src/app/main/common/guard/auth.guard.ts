/**
 * @file: auth.guard.ts
 * @description: This file checks the authrntication & authorization of the user for the pages.
 * @author: Asish Das
 */
import { UserLoggedInfoService } from './../services/user-logged-info.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  
  constructor(private loginInfoService: UserLoggedInfoService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let allowRoute: boolean = false;
      if(this.loginInfoService.isUserLoggedIn()){

        const userType = this.loginInfoService.getUserType();

        if(userType == 1 && state.url.toLowerCase().indexOf('admin') !== -1){
          allowRoute = true;
        }
        else if(userType == 1 && state.url.toLowerCase().indexOf('admin') === -1){
          this.router.navigate(['../admin/dashboards']);
        }
        else if(userType == 2 && state.url.toLowerCase().indexOf('user') !== -1){
          allowRoute = true;
        }
        else if(userType == 2 && state.url.toLowerCase().indexOf('user') === -1){
          this.router.navigate(['../user/dashboard']);
        }
      }
      // If admin login then allow it to proceed.
      else if(state.url.toLowerCase().indexOf('admin/login') !== -1){
        allowRoute = true;
      }
      // If logged out user routes then allow them
      else if(state.url.toLowerCase().indexOf('user') === -1 &&
              state.url.toLowerCase().indexOf('admin') === -1){
        allowRoute = true;
      }
      // Default is to migrate to login.
      else{
        console.log('ho');
        this.loginInfoService.logoutUser();
        this.router.navigate(['/login']);
      }
      
      return allowRoute;

  }


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // write code when used to handle child routes after admin and user
      return of(false);
  }


  canDeactivate(
    component: CanComponentDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return component.canDeactivate ? component.canDeactivate() : true;

  }

}
