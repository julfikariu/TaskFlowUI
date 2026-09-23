import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login'
import { Register } from './features/auth/register/register'
import { Home } from './features/home/home'
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: '',
        component: Home,
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./layouts/authenticated/authenticated-layout/authenticated-layout').then(m => m.AuthenticatedLayout),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
            },
            {
                path: 'projects',
                loadComponent: () => import('./features/projects/projects').then(m => m.Projects),
            },
            {
                path: 'tasks',
                loadComponent: () => import('./features/tasks/tasks').then(m => m.Tasks),
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
];
