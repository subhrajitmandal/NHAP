/**
 * @file: admin-users.component.ts
 * @description: This is the admin users page
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUsersDialogComponent } from './admin-users-dialog/admin-users-dialog.component';
import { AdminUsersService } from './admin-users.service';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
 
 export interface UserListDatatype {
  id: string;
  username: string;
  phone: string;
  email: string;
  wallet: string;
  firstName: string;
  lastName: string;
}

 @Component({
   selector: 'app-admin-users',
   templateUrl: './admin-users.component.html',
   styleUrls: ['./admin-users.component.scss']
 })
 
 export class AdminUsersComponent implements OnInit, AfterViewInit {
 
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[];
  userDatasource: MatTableDataSource<UserListDatatype>;
 
   constructor(private dialog: MatDialog,
               private usersService: AdminUsersService,
               private notification: MatSnackBar) { 

    this.displayedColumns = ['id', 'username', 'phone', 'email', 'wallet', 'addCoin', 'editUser', 'deleteUser'];
    this.userDatasource = new MatTableDataSource<UserListDatatype>();
   }

     /**
   * @function: ngAfterViewInit
   * @description: This function sets the paginator and sorting of the table.
   * @param: null
   * @returns: void
   */
  ngAfterViewInit() {
    this.userDatasource.paginator = this.paginator;
    this.userDatasource.sort = this.sort;
  }

  /**
   * @function: ngOnInit
   * @description: This function sets the data in the datasource of the table
   * @param: null
   * @returns: void
   */
   ngOnInit(): void {

      // fetch and display the user data in table.
      this.getUsersData();
   }
 
  /**
   * @function: getUsersData
   * @description: This function fetches the user for displaying in table
   * @param: null
   * @returns: void
   */
   getUsersData(): void {
      this.usersService.getadminUsersList()
      .pipe(
        take(1)
      )
      .subscribe( (userData) => {

        if(userData.success === 'true'){

          let userListData: Array<UserListDatatype> = [];

          for(let i = 0; i< userData.data.length; i++){

            userListData[i] = { id: userData.data[i].id,
                                username: userData.data[i].first_name + ' ' + userData.data[i].last_name,
                                phone: userData.data[i].phone,
                                email: userData.data[i].email,
                                wallet: userData.data[i].wallet_balance,
                                firstName: userData.data[i].first_name,
                                lastName: userData.data[i].last_name
                              };
            
          }
          
          this.userDatasource.data = userListData;
        }
      });
   }


  /**
   * @function: handleWalletUpdate
   * @description: This function handles the click for wallet update
   * @param: selectedUser, event
   * @returns: void
   */
   handleWalletUpdate(selectedUser: UserListDatatype, event: Event ): void {
    event.stopPropagation();

    // Open dialog to display the input field to enter the wallet balance
    const dialogRef = this.dialog.open(AdminUsersDialogComponent, {
      data: { section: 'UPDATE WALLET',
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              wallet: selectedUser.wallet,
              password: ''
            }
    });


    dialogRef.afterClosed()
    .pipe(
      take(1),
      mergeMap( (returnedData) => {

        if(returnedData){

          const walletFormData: FormData = new FormData();
          walletFormData.append('user_id', selectedUser.id);
          walletFormData.append('amount', returnedData.wallet);

          return this.usersService.updateWalletBalance(walletFormData).pipe(take(1));
        }
        
        return of();
      })
    )
    .subscribe( (walletStatus) => {

      this.notification.open(walletStatus.message);

      if(walletStatus?.success === 'true'){
            
        // Reload the table to update the table
        this.getUsersData();
      }
    });

  }

  /**
   * @function: handleEditUser
   * @description: This function handles the edit of the user
   * @param: selectedUser, event
   * @returns: void
  */
   handleEditUser(selectedUser: UserListDatatype, event: Event ): void {
    event.stopPropagation();

    // Open dialog box to display the user edit form
    const dialogRef = this.dialog.open(AdminUsersDialogComponent, {
      data: { section: 'UPDATE USER',
              firstName: selectedUser.firstName,
              lastName: selectedUser.lastName,
              phone: selectedUser.phone,
              email: selectedUser.email,
              wallet: '',
              password: ''
            }
    });

    dialogRef.afterClosed()
    .pipe(
      take(1),
      mergeMap( (returnedData) => {

        if(returnedData){

          const userEditFormData: FormData = new FormData();
          userEditFormData.append('first_name', returnedData.firstName);
          userEditFormData.append('last_name', returnedData.lastName);
          userEditFormData.append('phone', returnedData.phone);
          userEditFormData.append('email', returnedData.email);
          userEditFormData.append('password', returnedData.password);
          return this.usersService.updateUserDetails(userEditFormData, selectedUser.id).pipe(take(1));
        }
        
        return of();
      })
    )
    .subscribe( (editStatus) => {

      this.notification.open(editStatus.message);

      if(editStatus?.success === 'true'){
            
        // Reload the table to update the table
        this.getUsersData();
      }
    });
  }

  /**
   * @function: handleDeleteUser
   * @description: This function handles deletion of user
   * @param: selectedUser, event
   * @returns: void
   */
   handleDeleteUser(selectedUser: UserListDatatype, event: Event ): void {
    event.stopPropagation();

    this.usersService.deleteUser(selectedUser.id)
    .pipe(
      take(1)
    )
    .subscribe( (deleteStatus) => {

      this.notification.open(deleteStatus.message);

      if(deleteStatus.success === 'true'){

        //Reload the table to update the table
        this.getUsersData();
      }
    });


  }

  /**
   * @function: addUser
   * @description: This function opens a dialog box displaying add user functionality
   * @param: null
   * @returns: void
   */
   addUser(): void {
      // Check admin module for dialog configuration
      const dialogRef = this.dialog.open(AdminUsersDialogComponent, {
          data: { section: 'ADD USER',
                  firstName: '',
                  lastName: '',
                  phone: '',
                  email: '',
                  wallet: '',
                  password: ''
                }
      });

      dialogRef.afterClosed()
      .pipe(
        take(1),
        mergeMap( (returnedData) => {

          if(returnedData){

            const userAddFormData: FormData = new FormData();
            userAddFormData.append('first_name', returnedData.firstName);
            userAddFormData.append('last_name', returnedData.lastName);
            userAddFormData.append('phone', returnedData.phone);
            userAddFormData.append('email', returnedData.email);
            userAddFormData.append('wallet', returnedData.wallet);
            userAddFormData.append('password', returnedData.password);
            return this.usersService.addUsers(userAddFormData).pipe(take(1));
          }
          
          return of();
        })
      )
      .subscribe( (editStatus) => {
  
        this.notification.open(editStatus.message);

        if(editStatus?.success === 'true'){
              
          // Reload the table to update the table
          this.getUsersData();
        }
      });


  }

 }