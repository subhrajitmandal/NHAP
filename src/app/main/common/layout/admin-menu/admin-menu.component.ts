/**
 * @file: admin-menu.component.ts
 * @description: This is the admin menu page
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserLoggedInfoService } from '../../services/user-logged-info.service';
import { take } from 'rxjs/operators';
 
 @Component({
   selector: 'app-admin-menu',
   templateUrl: './admin-menu.component.html',
   styleUrls: ['./admin-menu.component.scss']
 })
 
 export class AdminMenuComponent {
 
  userId: string;
 
   constructor(private loggedInService: UserLoggedInfoService,
               private router: Router,
               private authenticationService: AuthenticationService) { 
 
      this.userId = '';
   }
 
  /**
   * @function: ngOnInit
   * @description: The user's name is to be shown in the toolbar
   * @param: null
   * @return: void
  */
   ngOnInit(): void {

      this.loggedInService.userInfoObs
      .subscribe( (userData) => {
        if(userData){
          this.userId = userData.user_id;
        }
      });
    } 

  /**
   * @function: logout
   * @description: The user is removed from the local storage and routed to login page.
   * @param: null
   * @return: void
  */
   logout(): void {

    const logoutUser: FormData = new FormData();
    logoutUser.append('user_id', this.userId);

    this.authenticationService.adminLogout(logoutUser).pipe(take(1)).subscribe();

    this.loggedInService.logoutUser();
    this.router.navigate(['admin/login']);
  }

 }
 
 