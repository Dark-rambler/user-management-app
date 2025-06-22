import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly mockUsers = environment.mockData.users;
  private readonly loginDelay = environment.config.loginDelay;

  constructor() {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    console.log('🔐 Intentando autenticación...', { username: credentials.username });

    return of(null).pipe(
      delay(this.loginDelay),
      map(() => {
        const user = this.mockUsers.find(
          u => u.username === credentials.username && u.password === credentials.password
        );
        if (user) {
          const token = this.generateMockToken(user.username);
          const response: LoginResponse = {
            success: true,
            message: 'Login exitoso',
            user: {
              username: user.username,
              token: token
            }
          };

          localStorage.setItem('authToken', token);
          localStorage.setItem('currentUser', user.username);

          console.log('✅ Login exitoso:', response);
          return response;
        } else {
          console.log('❌ Credenciales inválidas');
          throw new Error('Credenciales inválidas');
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(200),
      map(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        return true;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }


  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  private generateMockToken(username: string): string {
    const timestamp = Date.now();
    return btoa(`${username}:${timestamp}:mock_token`);
  }
}
