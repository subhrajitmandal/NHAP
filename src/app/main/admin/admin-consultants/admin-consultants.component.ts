/**
 * @file: admin-consultants.component.ts
 * @description: This is the admin consultants page
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminConsultantsDialogComponent } from './admin-consultants-dialog/admin-consultants-dialog.component';
import { AdminConsultantsService } from './admin-consultants.service';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
 
 export interface ConsultantsListDatatype {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
}

 @Component({
   selector: 'app-admin-consultants',
   templateUrl: './admin-consultants.component.html',
   styleUrls: ['./admin-consultants.component.scss']
 })
 
 export class AdminConsultantsComponent implements OnInit, AfterViewInit {
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[];
  consultantDatasource: MatTableDataSource<ConsultantsListDatatype>;
 
   constructor(private dialog: MatDialog,
               private consultantsService: AdminConsultantsService,
               private notificaton: MatSnackBar) { 
    this.displayedColumns = ['id', 'name', 'phone', 'email', 'address', 'state', 'edit', 'delete'];
    this.consultantDatasource = new MatTableDataSource<ConsultantsListDatatype>();
   }

     /**
   * @function: ngAfterViewInit
   * @description: This function sets the paginator and sorting of the table.
   * @param: null
   * @returns: void
   */
  ngAfterViewInit() {
    this.consultantDatasource.paginator = this.paginator;
    this.consultantDatasource.sort = this.sort;
  }

  /**
   * @function: ngOnInit
   * @description: This function sets the data in the datasource of the table
   * @param: null
   * @returns: void
   */
   ngOnInit(): void {

      // Fetches the consultant list for the table
      this.getConsultants();
   }

  /**
   * @function: getConsultants
   * @description: This function fetches the latest data for consultant table
   * @param: null
   * @returns: void
  */
   getConsultants(): void {

    this.consultantsService.getConsultantsList()
    .pipe(
      take(1)
    )
    .subscribe( (consultantData) => {
        if(consultantData.success === 'true'){
          this.consultantDatasource.data = consultantData.data;
        }
        else{
          this.notificaton.open('Some Error Occurred');
        }
    });
   }

  /**
   * @function: handleDeleteConsultant
   * @description: This function deletes the consultant selected
   * @param: selectedConsultant
   * @returns: void
  */
   handleDeleteConsultant(selectedConsultant: ConsultantsListDatatype, event: Event ): void {
      event.stopPropagation();

      this.consultantsService.deleteConsultant(selectedConsultant.id)
      .pipe(
        take(1)
      )
      .subscribe( (deleteStatus) => {
          this.notificaton.open(deleteStatus.message);

          if(deleteStatus.success === 'true'){

            //Reload the table
            this.getConsultants();
          }
      });
   }


  /**
   * @function: handleEditConsultant
   * @description: This function handles the edit of the consultant
   * @param: selectedConsultant, event
   * @returns: void
   */
   handleEditConsultant(selectedConsultant: ConsultantsListDatatype, event: Event ): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(AdminConsultantsDialogComponent, {
      data: { section: 'UPDATE CONSULTANT',
              name: selectedConsultant.name,
              phone: selectedConsultant.phone,
              email: selectedConsultant.email,
              address: selectedConsultant.address,
              state: selectedConsultant.state
            }
    });

    dialogRef.afterClosed()
    .pipe(
      take(1),
      mergeMap( (returnedFormData) => {

        if(returnedFormData){

          const updateUserFormData: FormData = new FormData();
          updateUserFormData.append('name', returnedFormData.name);
          updateUserFormData.append('phone', returnedFormData.phone);
          updateUserFormData.append('email', returnedFormData.email);
          updateUserFormData.append('address', returnedFormData.address);
          updateUserFormData.append('state', returnedFormData.state);

          return this.consultantsService.updateConsultant(updateUserFormData, selectedConsultant.id).pipe(take(1));
        }
        return of()
      })
    )
    .subscribe( (updateStatus) => {

        this.notificaton.open(updateStatus.message);

        if(updateStatus?.success === 'true'){
          // Refresh the table
          this.getConsultants();
        }
    })

  }

  /**
   * @function: addConsultant
   * @description: This function opens a dialog box displaying add consultant functionality
   * @param: null
   * @returns: void
   */
   addConsultant(): void {
    // Check admin module for dialog configuration
    const dialogRef = this.dialog.open(AdminConsultantsDialogComponent, {
                        data: { section: 'ADD CONSULTANT',
                                name: '',
                                phone: '',
                                email: '',
                                address: '',
                                state: ''
                              }
                      });
    
    dialogRef.afterClosed()
    .pipe(
      take(1),
      mergeMap( (returnedData) => {
        if(returnedData){

          const addConsultantFormData: FormData = new FormData();
          addConsultantFormData.append('name', returnedData.name);
          addConsultantFormData.append('phone', returnedData.phone);
          addConsultantFormData.append('email', returnedData.email);
          addConsultantFormData.append('address', returnedData.address);
          addConsultantFormData.append('state', returnedData.state);

          return this.consultantsService.addConsultant(addConsultantFormData).pipe(take(1));
        }
        return of();
      })
    )
    .subscribe( (addStatus) => {

        this.notificaton.open(addStatus.message);

        if(addStatus?.success === 'true'){
            //Reload the table
            this.getConsultants();
        }
    });
  }
 
 }