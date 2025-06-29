import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public sidebarService = inject(SidebarService);

  public closeSidebar() {
    this.sidebarService.close();
  }
}
