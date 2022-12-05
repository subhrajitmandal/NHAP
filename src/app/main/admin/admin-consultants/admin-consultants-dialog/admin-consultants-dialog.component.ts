/**
 * @file: admin-consultants-dialog.component.ts
 * @description: This is the admin consultant dialog page
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { stateListData } from 'src/app/main/common/models/survey.model';
 
export interface ConsultantAddEditDatatype {
  section: string,
  name: string,
  phone: string,
  email: string,
  address: string,
  state: string
}

 @Component({
   selector: 'app-admin-consultants-dialog',
   templateUrl: './admin-consultants-dialog.component.html',
   styleUrls: ['./admin-consultants-dialog.component.scss']
 })
 
 export class AdminConsultantsDialogComponent implements OnInit {
 
    addConsultantsForm: FormGroup;
    stateList: Array<Record<string, any>>;
 
   constructor(private fbuilder: FormBuilder,
               private dialogRef: MatDialogRef<AdminConsultantsDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public parentData: ConsultantAddEditDatatype) { 

        this.stateList = stateListData;

        this.addConsultantsForm = this.fbuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
            phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
            email: ['', [Validators.required, Validators.email]],
            address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            state: ['', [Validators.required]]
        });
   }

  /**
   * @function: ngOnInit
   * @description: This function adds the form data if its an edit form
   * @param: null
   * @returns: void
   */
   ngOnInit(): void {
    if(this.parentData?.section.indexOf('ADD') === -1){
      this.addConsultantsForm.setValue({
        name: this.parentData?.name,
        phone: this.parentData?.phone,
        email: this.parentData?.email,
        address: this.parentData?.address,
        state: this.parentData?.state
      });
    }
      
   }

  /**
   * @function: addConsultant
   * @description: This function creates a new consultant
   * @param: null
   * @returns: void
   */
   addConsultant(): void {

    if(this.addConsultantsForm.valid){
        this.dialogRef.close({
          name: this.addConsultantsForm.get('name')?.value,
          phone: this.addConsultantsForm.get('phone')?.value,
          email: this.addConsultantsForm.get('email')?.value,
          address: this.addConsultantsForm.get('address')?.value,
          state: this.addConsultantsForm.get('state')?.value
        });
    }
  }
 
 }