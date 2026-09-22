import { Injectable } from '@angular/core';

interface JwtPayload {
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

    private readonly tokenKey = 'accessToken';

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    isTokenExpired(): boolean {
        const token = this.getToken();

        if (!token) {
            return true;
        }

        try {
            const payload = this.decodeToken(token);

            if (!payload.exp) {
                return false;
            }

            const currentTime = Math.floor(
                Date.now() / 1000
            );

            return payload.exp < currentTime;
        } catch {
            return true;
        }
    }

    private decodeToken(token: string): JwtPayload {
        const payload = token.split('.')[1];

        const decodedPayload = atob(
            payload.replace(/-/g, '+').replace(/_/g, '/')
        );

        return JSON.parse(decodedPayload);
    }
}