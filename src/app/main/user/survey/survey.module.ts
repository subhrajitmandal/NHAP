import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from './../../common/layout/layout.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


import { SurveyCommonComponent } from './survey-common/survey-common.component';
import { SurveyPropertyComponent } from './survey-property/survey-property.component';
import { SurveyRoadComponent } from './survey-road/survey-road.component';
import { SurveyStoneComponent } from './survey-stone/survey-stone.component';
import { SurveyUploadComponent } from './survey-upload/survey-upload.component';
import { SurveyReviewComponent } from './survey-review/survey-review.component';
import { SurveyDiagramComponent } from './survey-diagram/survey-diagram.component';
import { SurveyDialogComponent } from './survey-dialog/survey-dialog.component';
import { SurveyPaymentComponent } from './survey-payment/survey-payment.component';

const appRoutes: Routes = [
  {
    path : '',
    component : SurveyCommonComponent
  }
];


@NgModule({
  declarations: [
    SurveyCommonComponent,
    SurveyPropertyComponent,
    SurveyRoadComponent,
    SurveyStoneComponent,
    SurveyUploadComponent,
    SurveyReviewComponent,
    SurveyDiagramComponent,
    SurveyDialogComponent,
    SurveyPaymentComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatStepperModule,
    LayoutModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class SurveyModule { }
