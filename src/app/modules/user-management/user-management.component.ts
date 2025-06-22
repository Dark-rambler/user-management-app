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
    // Effect para reaccionar a cambios en el estado del servicio
    effect(() => {
      const users = this.userService.users();
      const loading = this.userService.loading();
      const error = this.userService.error();

      console.log('📊 Estado del servicio actualizado:', {
        users: users.length,
        loading,
        error
      });
    });
  }

  ngOnInit(): void {
    console.log('🚀 Inicializando UserManagementComponent con signals...');
    // Cargar la primera página de usuarios
    this.userService.getUsersPaginated(1, 10).subscribe();
  }

  // Exponer signals del servicio para el template
  get users() { return this.userService.users; }
  get loading() { return this.userService.loading; }
  get error() { return this.userService.error; }
  get currentPage() { return this.userService.currentPage; }
  get pageSize() { return this.userService.pageSize; }
  get totalUsers() { return this.userService.totalUsers; }

  /**
   * Maneja el cambio de página desde el TableComponent
   * @param page Número de página
   */
  onPageChange(page: number): void {
    console.log('📄 Cambiando a página:', page);
    this.userService.goToPage(page);
  }

  /**
   * Maneja el cambio de tamaño de página desde el TableComponent
   * @param pageSize Nuevo tamaño de página
   */
  onPageSizeChange(pageSize: number): void {
    console.log('📐 Cambiando tamaño de página a:', pageSize);
    this.userService.setPageSize(pageSize);
  }

  /**
   * Recarga los datos
   */
  onRefresh(): void {
    console.log('🔄 Refrescando datos...');
    this.userService.refresh();
  }
}
