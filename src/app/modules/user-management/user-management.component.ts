import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { UserManagementModule } from './user-management.module';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-management',
  imports: [
    CommonModule, 
    UserManagementModule,
    
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent {


}
