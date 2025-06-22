import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { StatsComponent } from './components/stats/stats.component';
import { TableComponent } from './components/table/table.component';
import { BirthDatePipe } from '../../shared/pipes/birth-date.pipe';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    StatsComponent,
    TableComponent
  ],  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    NavbarComponent,
    SidebarComponent,
    BirthDatePipe,
    PhoneFormatPipe
  ],
  exports: [
    StatsComponent,
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    MaterialModule
  ]
})
export class UserManagementModule { }
