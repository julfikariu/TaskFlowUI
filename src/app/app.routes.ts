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
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: '',
        component: Home,
    }
];
