import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '../common/layout/layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ConsultantComponent } from './consultant.component';

const routes: Routes = [
  {
    path : 'consultant',
    component: ConsultantComponent
  }
];

@NgModule({
  declarations: [ConsultantComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    LayoutModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ConsultantModule { }
