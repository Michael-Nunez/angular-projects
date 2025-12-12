import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseURL = environment.baseURL;

@Injectable({providedIn: 'root'})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private httpClient = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkAuthStatus()
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking')
      return 'checking';

    if (this._user())
      return 'authenticated';

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<AuthResponse>(`${baseURL}/auth/login`, {
      email,
      password
    })
      .pipe(
        map((response) => this.handleAuthSuccess(response)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.httpClient.get<AuthResponse>(`${baseURL}/auth/check-status`)
      .pipe(
        map((response) => this.handleAuthSuccess(response)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess(response: AuthResponse) {
    this._user.set(response.user);
    this._token.set(response.token);
    this._authStatus.set('authenticated')

    localStorage.setItem('token', response.token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}