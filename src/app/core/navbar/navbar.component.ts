import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  sidebarService = inject(SidebarService);

  public listItems = [
    { name: 'Home', icon: 'home', route: '/user-management/users' },
    { name: 'Friends', icon: 'people', route: '/user-management/roles' },
    { name: 'Cats', icon: 'card_travel', route: '/user-management/permissions' },
    { name: 'Messages', icon: 'message', route: '/user-management/settings' },
    { name: 'Notifications', icon: 'notifications', route: '/user-management/help' }
  ];

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
