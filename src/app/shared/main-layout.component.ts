import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { NavbarComponent } from '../core/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NavbarComponent  ],
  template: `
    <div class="container-layout">
      <app-sidebar></app-sidebar>
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
}
