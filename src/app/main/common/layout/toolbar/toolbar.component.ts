import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserLoggedInfoService } from './../../services/user-logged-info.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() section: string;
  @Input() showHideButton: boolean;
  @Input() showHidePageHeader: boolean;
  @Input() isAdmin: boolean;

  username: string;
  userId: string;

  constructor(private loggedInService: UserLoggedInfoService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.username = '';
    this.section = '';
    this.showHideButton = false;
    this.showHidePageHeader = false;
    this.userId = '';
    this.isAdmin = false;
  }

  /**
   * @function: ngOnInit
   * @description: The user's name is to be shown in the toolbar
   * @param: null
   * @return: void
  */
  ngOnInit(): void {
    if(this.showHideButton){
      
      this.loggedInService.userInfoObs
      .subscribe( (userData) => {
        if(userData){
          this.username = userData.user_first_name + ' ' + userData.user_last_name;
          this.userId = userData.user_id;
        }
      });
    } 
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
    this.authenticationService.logout(logoutUser).pipe(take(1)).subscribe();
    this.loggedInService.logoutUser();
    this.router.navigate(['login']);
  }
}
