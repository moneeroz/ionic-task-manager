import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.page').then( m => m.TasksPage)
  },
];
