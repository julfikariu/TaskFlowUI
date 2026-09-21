import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import {
  LoginRequest,
  LoginResponse,
} from '@src/app/shared/models/auth.model';
import { TokenStorageService } from '@src/app/core/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly tokenStorage = inject(TokenStorageService);

    private readonly apiUrl = `${environment.apiUrl}/Auth`;

    readonly isAuthenticated = signal(
        this.tokenStorage.hasToken()
    );

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`,
            credentials,
        ).pipe(
            // Store the token in storage and update the authentication state
            tap((response) => {
                this.tokenStorage.setToken(
                    response.accessToken
                );

                this.isAuthenticated.set(true);
            })
        );
    }

    logout(): void {
        this.tokenStorage.removeToken();

        this.isAuthenticated.set(false);
    }

    getToken(): string | null {
        return this.tokenStorage.getToken();
    }
}