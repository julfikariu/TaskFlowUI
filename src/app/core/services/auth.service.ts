import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import {
  LoginRequest,
  LoginResponse,
} from '@src/app/shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/Auth`;

  constructor(
    private readonly http: HttpClient,
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials,
    );
  }
}