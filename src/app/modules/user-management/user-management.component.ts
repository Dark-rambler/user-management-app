import { Component, OnInit, OnDestroy, effect, DestroyRef, inject } from '@angular/core';
import { UserManagementModule } from './user-management.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  constructor(private userService: UserService) {
    effect(() => {
      const users = this.userService.users();
      const loading = this.userService.loading();
      const error = this.userService.error();
    });
  }

  public ngOnInit(): void {
    this.userService.getUsersPaginated(1, 5)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public get users() { return this.userService.users; }
  public get loading() { return this.userService.loading; }
  public get error() { return this.userService.error; }
  public get currentPage() { return this.userService.currentPage; }
  public get pageSize() { return this.userService.pageSize; }
  public get totalUsers() { return this.userService.totalUsers; }

  public onPageChange(page: number): void {
    this.userService.goToPage(page);
  }

  public onPageSizeChange(pageSize: number): void {
    this.userService.setPageSize(pageSize);
  }

  public onRefresh(): void {
    this.userService.refresh();
  }
}
