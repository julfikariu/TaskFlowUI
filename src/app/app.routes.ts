import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login'
import { Register } from './features/auth/register/register'
import { Dashboard } from './features/dashboard/dashboard'
import { Home } from './features/home/home'

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
        component: Dashboard,
    },
    {
        path: '',
        component: Home,
    }
];
