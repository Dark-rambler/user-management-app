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
    path: 'app',
    loadComponent: () => import('./shared/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'user-management',
        pathMatch: 'full'
      },
      {
        path: 'user-management',
        loadComponent: () => import('./modules/user-management/user-management.component')
      }
      // Aquí puedes agregar más rutas que necesiten el layout principal
    ]
  }
];
