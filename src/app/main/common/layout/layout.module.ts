import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    LayoutComponent,
    AdminMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule,
    MatGridListModule,
    MatSidenavModule
  ],
  exports: [
    ToolbarComponent,
    LayoutComponent,
    AdminMenuComponent
  ]
})
export class LayoutModule { }
