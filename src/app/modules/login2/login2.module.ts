import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Login2RoutingModule } from './login2-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginBannerComponent } from './components/login-banner/login-banner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginBannerComponent
  ],  imports: [
    CommonModule,
    ReactiveFormsModule,
    Login2RoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  exports: [
    LoginFormComponent,
    LoginBannerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class Login2Module { }
