import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from './../common/layout/layout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyListDialogComponent } from './survey-list/survey-list-dialog/survey-list-dialog.component';
import { CoinComponent } from './coin/coin.component';
import { AuthGuard } from '../common/guard/auth.guard';

const appRoutes: Routes = [
  {
    path : 'dashboard',
    component: DashboardComponent
  },
  {
    path : 'profile',
    component: ProfileComponent
  },
  {
    path : 'surveylist',
    component: SurveyListComponent
  },
  {
    path : 'coin',
    component: CoinComponent
  },
  {
    path : 'survey',
    loadChildren : () => import('./survey/survey.module').then((m) => m.SurveyModule)
  },
  {
    path : '',
    redirectTo : 'dashboard'
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    SurveyListComponent,
    SurveyListDialogComponent,
    CoinComponent
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
    MatDialogModule
  ]
})
export class UserModule { }
