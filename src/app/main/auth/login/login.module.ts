/**
 * @file: login.module.ts
 * @description: This module handles the login mechanism
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from './../../common/layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { ForgotPasswodComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from '../../common/guard/auth.guard';

const routes: Routes = [
  {
    path : 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'admin/login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswodComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    LayoutModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    LoginService,
    ForgotPasswordService
  ]
})
export class LoginModule { }
