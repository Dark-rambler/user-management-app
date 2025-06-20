import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login2/login2.component')
  },
  {
    path: 'user-management',
    loadComponent: () => import('./modules/user-management/user-management.component')
  }
];
