/**
 * @file: login.component.ts
 * @description: This is the login form page
 * @author: Asish Das
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { take } from 'rxjs/operators';
import { LoginSuccessFailModel } from '../../common/models/login.model'; 
import { UserLoggedInfoService } from './../../common/services/user-logged-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswodComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm: FormGroup;
  serverError: string;
  hide = true;

  constructor(private fGroup: FormBuilder,
              private loginService: LoginService,
              private loggedInfoService: UserLoggedInfoService,
              private notification: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) { 
    this.serverError = '';
    this.loginForm = this.fGroup.group({
      emailId: [''],
      password: ['', [Validators.required]]
    }); 
  }

  /**
   * @function: removeServerError
   * @description: This function removes the server error from displaying
   * @param: null
   * @returns: void
   */
  removeServerError(): void {
    this.serverError = '';
  }

  /**
   * @function: submitLoginForm
   * @description: This function submits the user login information
   * @param: null
   * @returns: void
   */
  submitLoginForm(): void {
    // If form is valid then only send request.
    // console.log(this.router.url, "this.router.url");

    if( !this.loginForm.invalid ){
      const loginFormData: FormData = new FormData();
      loginFormData.append('email_phone', this.loginForm.get('emailId')?.value);
      loginFormData.append('password', this.loginForm.get('password')?.value);

      if(this.router.url === '/login'){
        // Validating login from api
      this.loginService.validateLogin(loginFormData)
      .pipe(
        take(1)
      )
      .subscribe( (status: LoginSuccessFailModel) => {

        if(status.success === 'false'){
          this.notification.open(status.message, 'OK');
          this.router.navigate(['/login']);
        }
        else{

          // save the logged in user data in behaviour subject.
          const valid = this.loggedInfoService.saveUserInfo(status.access);
          if(valid){
            // save the access token in local storage
            this.loggedInfoService.saveAccessToken(status.access);

            // save the refresh token in local storage
            this.loggedInfoService.saveRefreshToken(status.refresh);

            // remove the notification and redirect to dashboard.
            this.router.navigate(['../user/dashboard']);
          }
          else{
            this.loginForm.reset();
            this.notification.open('Invalid token. Please login again.', 'Ok');
          }
        }
      });
      }
      else{
        // Validating login from api
        this.loginService.validateAdminLogin(loginFormData)
        .pipe(
          take(1)
        )
        .subscribe( (status: LoginSuccessFailModel) => {
  
          if(status.success === 'false'){
            this.notification.open(status.message, 'OK');
            this.router.navigate(['/admin/login']);
          }
          else{
  
            // save the logged in user data in behaviour subject.
            const valid = this.loggedInfoService.saveUserInfo(status.access);
            if(valid){
              // save the access token in local storage
              this.loggedInfoService.saveAccessToken(status.access);
  
              // save the refresh token in local storage
              this.loggedInfoService.saveRefreshToken(status.refresh);
  
              // remove the notification and redirect to dashboard.
              this.router.navigate(['../admin/dashboards']);
            }
            else{
              this.loginForm.reset();
              this.notification.open('Invalid token. Please login again.', 'Ok');
            }
          }
        });
      }
    }
  }

  /**
   * @function: openForgotPassDialog
   * @description: This function opens the forgot password dialog
   * @param: null
   * @returns: void
  */
  openForgotPassDialog(): void {
    this.dialog.open(ForgotPasswodComponent, {
      width: '500px',
      height: 'auto',
      hasBackdrop: true,
      disableClose: true
    })
  }
}

