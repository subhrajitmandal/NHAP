/**
 * @file: signup.module.ts
 * @description: This module handles the sign up section
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from './../../common/layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { SignupComponent } from './signup.component';
import { SignupDialogComponent } from './signup-dialog.component';

import { SignupService } from './signup.service';
import { AuthGuard } from '../../common/guard/auth.guard';

const routes: Routes = [
  {
    path : 'signup',
    component : SignupComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    SignupComponent,
    SignupDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers : [
    SignupService
  ]
})
export class SignupModule { }
