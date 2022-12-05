/**
 * @file: signup.component.ts
 * @description: This file handles the sign up form
 * @author: Asish Das
 */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from './signup-dialog.component';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from './signup.service';
import { CustomValidators } from '../../common/validators/custom.validators';
import { ErrorStateMatcher } from '@angular/material/core';

class CrossFieldError implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control?.dirty && (form?.errors?.mismatch || !!control?.errors)) || (!!control?.errors && form?.submitted);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm: FormGroup;
  serverError: string;
  hide = true;
  crossErrorMatcher: ErrorStateMatcher;

  constructor(private fbuilder: FormBuilder,
              private dialog: MatDialog,
              private signupService: SignupService,
              private notification: MatSnackBar) {

    this.serverError = '';
    this.crossErrorMatcher = new CrossFieldError();

    this.signUpForm = this.fbuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      confirmPassword: ['']
    }, 
    {
      validator: [CustomValidators.passwordValidator]
    });
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

  /**
 * @function: Signup
 * @description: This function registers data
 * @param: null
 * @returns: void
 */
   signUpSubmit(): void {
    const signUpData: FormData = new FormData();
    signUpData.append('first_name', this.signUpForm.get('firstName')?.value);
    signUpData.append('last_name', this.signUpForm.get('lastName')?.value);
    signUpData.append('phone', this.signUpForm.get('mobile')?.value);
    signUpData.append('email', this.signUpForm.get('email')?.value);
    signUpData.append('password', this.signUpForm.get('password')?.value);
    this.signupService.signUpSubmit(signUpData).pipe(take(1)).subscribe((status) => {

      if (status.success === 'true') {
        // this.dialogRef.close();

        // Notifying the user that the registration was a success.
        // this.notification.open('User registered successfully', 'Ok');

        // Redirecting to login after successfull verification
        // this.router.navigate(['../login']);
        if(this.signUpForm.valid){

          const dialogRef = this.dialog.open(SignupDialogComponent, {
            hasBackdrop: true,
            disableClose: true,
            width: '500px',
            height: '350px',
            data: {
              first_name: this.signUpForm.get('firstName')?.value,
              last_name: this.signUpForm.get('lastName')?.value,
              email: this.signUpForm.get('email')?.value,
              phone: this.signUpForm.get('mobile')?.value,
              password: this.signUpForm.get('password')?.value
            }
          })
        }
      }
      else {
        // Notifying the user that error exists in the form.
        this.serverError = status.message;
        this.notification.open(this.serverError, 'Ok');
        // this.signUpOtpForm.get('mobileOtp')?.patchValue('');
        // this.signUpOtpForm.get('emailOtp')?.patchValue('');
        // console.log(this.serverError)
      }
    });
  }

  /**
   * @function: openSignupDialog
   * @description: This function opens the dialog for otp entry
   * @param: null
   * @return: void
  */
  openSignupDialog(): void {

    this.signUpSubmit();

  }

}
