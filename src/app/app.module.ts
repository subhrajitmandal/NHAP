import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginModule } from './main/auth/login/login.module';
import { SignupModule } from './main/auth/signup/signup.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from './main/common/layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from './main/common/interceptors/token.interceptor';
import { HTTPErrorInterceptor } from './main/common/interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { ConsultantComponent } from './main/consultant/consultant.component';
import { ContactComponent } from './main/contact/contact.component';
import { DisclaimerComponent } from './main/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { SupportComponent } from './main/support/support.component';
import { TermnconditionsComponent } from './main/termnconditions/termnconditions.component';
import { FooterComponent } from './main/footer/footer.component';
import { HeaderComponent } from './main/header/header.component';
import { PricingComponent } from './main/pricing/pricing.component';
import { SpinnerInterceptor } from './main/common/interceptors/spinner.interceptor';
import { AuthGuard } from './main/common/guard/auth.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./main/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'consultant',
    component: ConsultantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pricing',
    component: PricingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'termsnconditions',
    component: TermnconditionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    component: SupportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultantComponent,
    ContactComponent,
    DisclaimerComponent,
    PrivacyPolicyComponent,
    SupportComponent,
    TermnconditionsComponent,
    FooterComponent,
    HeaderComponent,
    PricingComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'corrected' }),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    LoginModule,
    SignupModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatGridListModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
