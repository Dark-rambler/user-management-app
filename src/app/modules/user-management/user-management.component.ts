import { Component } from '@angular/core';
import { UserManagementModule } from './user-management.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, UserManagementModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent {
  public showFiller = false;
 
  constructor() {
    // Initialization logic can go here if needed
    this.showFiller = false;

  }

}
