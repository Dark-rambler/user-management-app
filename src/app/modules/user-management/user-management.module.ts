import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { StatsComponent } from './components/stats/stats.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableComponent } from './components/table/table.component';
import { BirthDatePipe } from '../../shared/pipes/birth-date.pipe';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';

@NgModule({
  declarations: [
    StatsComponent,
    TableComponent
  ],  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatIconModule,
    NavbarComponent,
    SidebarComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    BirthDatePipe,
    PhoneFormatPipe
  ],exports: [
    StatsComponent,
    MatIconModule,
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    MatProgressSpinnerModule
  ]
})
export class UserManagementModule { }
