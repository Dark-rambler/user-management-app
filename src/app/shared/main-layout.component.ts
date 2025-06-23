import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { SidebarService } from '../core/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NavbarComponent
  ],
  template: `
    <div class="container-layout">
      <!-- Sidebar con overlay en móvil -->
      <app-sidebar [class.sidebar-open]="sidebarService.isOpen()"></app-sidebar>

      <!-- Overlay para cerrar sidebar en móvil -->
      @if (sidebarService.isOpen()) {
        <div class="sidebar-overlay" (click)="sidebarService.close()"></div>
      }

      <div class="right-content">
        <app-navbar></app-navbar>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public sidebarService = inject(SidebarService);
}
