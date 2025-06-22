import { Component, OnInit, effect } from '@angular/core';
import { UserManagementModule } from './user-management.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    UserManagementModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {

  constructor(private userService: UserService) {
    effect(() => {
      const users = this.userService.users();
      const loading = this.userService.loading();
      const error = this.userService.error();
    });  }

  ngOnInit(): void {
    this.userService.getUsersPaginated(1, 10).subscribe();
  }

  get users() { return this.userService.users; }
  get loading() { return this.userService.loading; }
  get error() { return this.userService.error; }
  get currentPage() { return this.userService.currentPage; }
  get pageSize() { return this.userService.pageSize; }
  get totalUsers() { return this.userService.totalUsers; }

  /**
   * Maneja el cambio de página desde el TableComponent
   */
  onPageChange(page: number): void {
    this.userService.goToPage(page);
  }

  /**
   * Maneja el cambio de tamaño de página desde el TableComponent
   */
  onPageSizeChange(pageSize: number): void {
    this.userService.setPageSize(pageSize);
  }

  /**
   * Recarga los datos
   */
  onRefresh(): void {
    this.userService.refresh();
  }
}
