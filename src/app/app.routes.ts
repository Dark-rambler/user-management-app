import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component')
  },
  {
    path: 'app',
    loadComponent: () => import('./shared/main-layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'user-management',
        pathMatch: 'full'
      },
      {
        path: 'user-management',
        loadComponent: () => import('./modules/user-management/user-management.component')      },
      {
        path: 'user/:id',
        loadComponent: () => import('./modules/user/user.component')
      }
    ]
  }
];
