import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from './../common/layout/layout.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSurveyComponent } from './admin-survey/admin-survey.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminConsultantsComponent } from './admin-consultants/admin-consultants.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { AdminConsultantsDialogComponent } from './admin-consultants/admin-consultants-dialog/admin-consultants-dialog.component';
import { AdminUsersDialogComponent } from './admin-users/admin-users-dialog/admin-users-dialog.component';

const appRoutes: Routes = [
  {
    path : 'dashboards',
    component: AdminDashboardComponent
  },
  {
    path : 'survey',
    component: AdminSurveyComponent
  },
  {
    path : 'users',
    component: AdminUsersComponent
  },
  {
    path : 'consultants',
    component: AdminConsultantsComponent
  },
  {
    path : 'reports',
    component: AdminReportsComponent
  },
  {
    path : '',
    redirectTo : 'dashboards'
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminSurveyComponent,
    AdminUsersComponent,
    AdminConsultantsComponent,
    AdminReportsComponent,
    AdminConsultantsDialogComponent,
    AdminUsersDialogComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LayoutModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true, width: '500px', height: 'auto'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class AdminModule { }
