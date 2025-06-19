import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { SidebarComponent } from '../../core/sidebar/sidebar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatIconModule,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    MatIconModule,
    NavbarComponent,
    SidebarComponent
  ]
})
export class UserManagementModule { }
