/**
 * @file: custom.validators.ts
 * @description: This file is used for custom validation
 * @author: Asish Das
 */

import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    constructor(){}

    static fileValidator(fileControl: AbstractControl): ValidationErrors | null{

        const fileFormat = ['jpeg', 'jpg', 'png', 'svg'];

        if (fileControl.value){

          if (fileFormat.indexOf(fileControl.value.split('.').pop().toLowerCase()) < 0){

            return { fileExtension: true};
          }
        }

        return null;
    }

    static passwordValidator(passwordFormGroup: FormGroup): ValidationErrors | null{
        const password = passwordFormGroup.get('password');
        const confirmPassword = passwordFormGroup.get('confirmPassword');

        return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true} : null;
    }
}
