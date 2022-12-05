/**
 * @file: forgot-password.component.ts
 * @description: This is the forgot password.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordService } from './forgot-password.service';
import { appAnimation } from 'src/app/main/common/animations/app.animation';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomValidators } from 'src/app/main/common/validators/custom.validators';
import { UserLoggedInfoService } from '../../../common/services/user-logged-info.service';

class CrossFieldError implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return (control?.dirty && (form?.errors?.mismatch || !!control?.errors)) || (!!control?.errors && form?.submitted);
    }
}

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: appAnimation
})

export class ForgotPasswodComponent {

    forgotPasswordForm: FormGroup;
    serverError: string;
    whichForm: number;
    viewForm1: boolean;
    viewForm2: boolean;
    crossFieldMatcher: ErrorStateMatcher;

    constructor(private fGroup: FormBuilder,
        private notification: MatSnackBar,
        private forgotPassService: ForgotPasswordService,
        private loggedInfoService: UserLoggedInfoService,
        private dialogRef: MatDialogRef<ForgotPasswodComponent>) {
        this.serverError = '';
        this.whichForm = 1;
        this.viewForm1 = true;
        this.viewForm2 = false;
        this.crossFieldMatcher = new CrossFieldError();

        this.forgotPasswordForm = this.fGroup.group({
            email_phone: ['', [Validators.required]], //, Validators.email
            phone_email_Otp: [''],
            password: [''],
            confirmPassword: [''],
            user_id: ['']
        },
        {
            validator: [CustomValidators.passwordValidator]
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
     * @function: sendPhoneOtp
     * @description: This function sends phone otp
     * @param: null
     * @returns: void
     */
    sendPhoneOtp(): void {

        const phoneOtpForm: FormData = new FormData();
        phoneOtpForm.append('email_phone', this.forgotPasswordForm.get('email')?.value);

        this.forgotPassService.sendPhoneOtp(phoneOtpForm)
            .pipe(
                take(1)
            )
            .subscribe((otpStatus) => {
                if (otpStatus.success === 'true') {
                    this.notification.open('Phone OTP has been sent successfully', 'Ok', { duration: 2500 });
                }
                else {
                    this.notification.open('Some error occurred. Please try again later', 'Ok', { duration: 2500 });
                }
            });
    }

    /**
     * @function: sendEmailOtp
     * @description: This function sends email otp
     * @param: null
     * @returns: void
     */
    sendEmailOtp(): void {

        const emailOtpForm: FormData = new FormData();
        emailOtpForm.append('email_phone', this.forgotPasswordForm.get('email_phone')?.value);

        this.forgotPassService.resend_forgetpassword_otp(emailOtpForm)
            .pipe(
                take(1)
            )
            .subscribe((otpStatus) => {
                if (otpStatus.success === 'true') {
                    this.notification.open('Email OTP has been sent successfully', 'Ok', { duration: 2500 });
                }
                else {
                    this.notification.open('Some error occurred. Please try again later', 'Ok', { duration: 2500 });
                }
            });
    }

    /**
     * @function: validateOtp
     * @description: This function validates the otp form
     * @param: null
     * @returns: void
     */
    handleForms(): void {
        switch (this.whichForm) {
            case 1:
                this.validateUser();
                break;
            case 2:
                this.changePassword();
                break;
        }
    }

    /**
     * @function: validateUser
     * @description: This function validates the otp form
     * @param: null
     * @returns: void
     */
    validateUser(): void {
        if (this.forgotPasswordForm.valid) {

            const userValidationForm: FormData = new FormData();
            userValidationForm.append('email_phone', this.forgotPasswordForm.get('email_phone')?.value);

            this.forgotPassService.validateUser(userValidationForm)
                .subscribe((userStatus) => {
                    if (userStatus.success === 'true' && userStatus.user_id.length) {
                        this.whichForm = 2;
                        this.viewForm1 = false;
                        this.viewForm2 = true;
                        this.forgotPasswordForm.get('user_id')?.patchValue(userStatus.user_id);
                        this.forgotPasswordForm.get('phone_email_Otp')?.addValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
                        this.forgotPasswordForm.get('password')?.addValidators([Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
                        this.forgotPasswordForm.get('confirmPassword')?.addValidators([Validators.required]);
                        this.forgotPasswordForm.updateValueAndValidity();
                        this.notification.open('OTP has been sent successfully', 'Ok', { duration: 2500 });

                    }
                    else {
                        this.notification.open('User does not exist. Kindly enter correct details', 'Ok', { duration: 2500 });
                    }
                });
        }

    }

    /**
     * @function: changePassword
     * @description: This function validates the otp form and changes the password
     * @param: null
     * @returns: void
     */
     changePassword(): void {
        if (this.forgotPasswordForm.valid) {

            const otpForm: FormData = new FormData();
            otpForm.append('user_id', this.forgotPasswordForm.get('user_id')?.value);
            otpForm.append('otp', this.forgotPasswordForm.get('phone_email_Otp')?.value);
            otpForm.append('new_password', this.forgotPasswordForm.get('password')?.value);

            this.forgotPassService.validateForgotPasswordOtp(otpForm)
                .pipe(
                    take(1)
                )
                .subscribe((otpStatus) => {
                    if (otpStatus.success === 'true') {

                        this.notification.open('Password changed successfully', 'Ok', { duration: 2500 });
                        this.dialogRef.close();
                    }
                    else {
                        this.notification.open('Some error occurred. Please try again later.', 'Ok', { duration: 2500 });
                    }
                });
        }
    }

}

