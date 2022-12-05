/**
 * @file: admin-users-dialog.component.ts
 * @description: This is the admin users dialog page
 */
 import { Component, Inject, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
 export interface UserDialogDatatype {
  section: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  wallet: string,
  password: string
}

  @Component({
    selector: 'app-admin-users-dialog',
    templateUrl: './admin-users-dialog.component.html',
    styleUrls: ['./admin-users-dialog.component.scss']
  })

  export class AdminUsersDialogComponent implements OnInit{
  
     addUsersForm: FormGroup;
  
    constructor(private fbuilder: FormBuilder,
                private dialogRef: MatDialogRef<AdminUsersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public parentData: UserDialogDatatype) { 
 
         this.addUsersForm = this.fbuilder.group({
             firstName: [''],
             lastName: [],
             phone: [''],
             email: [''],
             wallet: [''],
             password: ['']
         });
    }
 
  /**
    * @function: ngOnInit
    * @description: This function creates a new user
    * @param: null
    * @returns: void
  */
  ngOnInit(): void {
    if(this.parentData.section.indexOf('WALLET') !== -1 || this.parentData.section.indexOf('ADD') !== -1){
      this.addUsersForm.get('wallet')?.addValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
      this.addUsersForm.updateValueAndValidity();
    }
    else{
      this.addUsersForm.get('firstName')?.addValidators([Validators.required, Validators.minLength(3), 
                                                         Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]);
      this.addUsersForm.get('lastName')?.addValidators([Validators.required, Validators.minLength(3), 
                                                         Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]);
      this.addUsersForm.get('phone')?.addValidators([Validators.required, Validators.minLength(10),
                                                        Validators.maxLength(10), Validators.pattern('^[0-9]+$')]);
      this.addUsersForm.get('email')?.addValidators([Validators.required, Validators.email]);
      this.addUsersForm.get('password')?.addValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
      this.addUsersForm.updateValueAndValidity();
    }

    this.addUsersForm.setValue({
      firstName: this.parentData.firstName,
      lastName: this.parentData.lastName,
      phone: this.parentData.phone,
      email: this.parentData.email,
      wallet: 0, //this.parentData.wallet
      password: this.parentData.password
    });
  }
 

   /**
    * @function: addUsers
    * @description: This function creates a new user
    * @param: null
    * @returns: void
    */
    addUsers(): void {

     if(this.addUsersForm.valid){

         this.dialogRef.close({
          firstName: this.addUsersForm.get('firstName')?.value,
          lastName: this.addUsersForm.get('lastName')?.value,
          phone: this.addUsersForm.get('phone')?.value,
          email: this.addUsersForm.get('email')?.value,
          wallet: this.addUsersForm.get('wallet')?.value,
          password: this.addUsersForm.get('password')?.value
         });
     }
   }
  
  }