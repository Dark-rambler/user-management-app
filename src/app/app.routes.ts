import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component')
  },
  // {
  //   path: 'users',
  //   loadComponent: () => import('./features/user-list/user-list.component').then(m => m.UserListComponent)
  // },
  // {
  //   path: 'users/:uuid',
  //   loadComponent: () => import('./features/user-detail/user-detail.component').then(m => m.UserDetailComponent)
  // }
  // ,
  // {
  //   path: 'register',
  //   loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent)
  // }
];
