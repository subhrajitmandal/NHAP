/**
 * @file: signup-dialog.component.ts
 * @description: This file handles the sign up form otp and form submit
 * @author: Asish Das
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SignupDataType {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})

export class SignupDialogComponent implements OnInit {

  signUpOtpForm: FormGroup;
  serverError: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SignupDataType,
    private fBuilder: FormBuilder,
    private signupService: SignupService,
    private notification: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<SignupDialogComponent>) {

    this.signUpOtpForm = this.fBuilder.group({
      mobileOtp: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      emailOtp: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    this.serverError = '';
  }

  /**
   * @function: ngOnInit
   * @description: This function sends the first otp for phone and email
   * @param: null
   * @returns: void
   */
  ngOnInit(): void {
    // this.signUpSubmit();
  }

  /**
 * @function: Signup Submit
 * @description: This function registers data
 * @param: null
 * @returns: void
 */
  signUpSubmit(): void {

    const signUpData: FormData = new FormData();
    signUpData.append('first_name', this.data.first_name);
    signUpData.append('last_name', this.data.last_name);
    signUpData.append('phone', this.data.phone);
    signUpData.append('email', this.data.email);
    signUpData.append('password', this.data.password);
    this.signupService.signUpSubmit(signUpData).pipe(take(1)).subscribe();
  }

  /**
   * @function: sendMobileOtp
   * @description: This function sends otp to mobile
   * @param: null
   * @returns: void
   */
  sendMobileOtp(): void {

    const mobileData: FormData = new FormData();
    mobileData.append('phone', this.data.phone);

    this.signupService.sendMobileOtp(mobileData).pipe(take(1)).subscribe();
  }

  /**
   * @function: sendEmailOtp
   * @description: This function sends otp to email
   * @param: null
   * @returns: void
   */
  sendEmailOtp(): void {

    const emailData: FormData = new FormData();
    emailData.append('email', this.data.email);

    this.signupService.sendEmailOtp(emailData).pipe(take(1)).subscribe();
  }

  /**
   * @function: register
   * @description: This function registers the user
   * @param: null
   * @returns: void
   */
  register(): void {

    if (!this.signUpOtpForm.invalid) {

      const signUpForm: FormData = new FormData();
      signUpForm.append('first_name', this.data.first_name);
      signUpForm.append('last_name', this.data.last_name);
      signUpForm.append('email', this.data.email);
      signUpForm.append('phone', this.data.phone);
      signUpForm.append('password', this.data.password);
      signUpForm.append('phone_otp', this.signUpOtpForm.get('mobileOtp')?.value);
      signUpForm.append('email_otp', this.signUpOtpForm.get('emailOtp')?.value);

      this.signupService.verifySubmit(signUpForm)
        .pipe(
          take(1)
        )
        .subscribe((status) => {

          if (status.success === 'true') {
            this.dialogRef.close();

            // Notifying the user that the registration was a success.
            this.notification.open('User registered successfully', 'Ok');

            // Redirecting to login after successfull verification
            this.router.navigate(['../login']);
          }
          else {
            // Notifying the user that error exists in the form.
            this.notification.open('Some error exists', 'Ok');
            this.serverError = status.message;
            this.signUpOtpForm.get('mobileOtp')?.patchValue('');
            this.signUpOtpForm.get('emailOtp')?.patchValue('');
          }
        });
    }
  }

  /**
   * @function: removeServerError
   * @description: This function removes the server side error message
   * @param: null
   * @returns: void
   */
  removeServerError(): void {
    this.serverError = '';
  }
}