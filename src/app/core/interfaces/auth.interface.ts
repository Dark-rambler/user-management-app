/**
 * Interfaces relacionadas con autenticación y login
 */

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

export interface AuthUser {
  username: string;
  token: string;
}
