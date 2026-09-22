import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const tokenStorage = inject(TokenStorageService);
    const authService = inject(AuthService);
    const token = tokenStorage.getToken();
    const router = inject(Router);

    if (!token) {
        return next(req);
    }

    const authRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    const isLoginRequest = req.url.endsWith('/Auth/login');

    return next(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401 && !isLoginRequest) {
                authService.logout();

                router.navigate(['/login']);
            }

            return throwError(() => error);
        })
    );
};