import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LogInUserRequest, AuthResponse, RegisterUserRequest } from '../models/auth.model';
import { concat, Observable, tap } from 'rxjs';
import { LocalStorageKeys } from '../models/localStorageKeys.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _api : ApiService) { } 

  login(credentials : LogInUserRequest) :Observable<AuthResponse> {
    return this._api.post<LogInUserRequest, AuthResponse>('users/Login', credentials)
      .pipe(
        tap(this.setTokensExpirationsToLocalStorage)
      );
  }

  register(credentials : RegisterUserRequest) {
    const logInUserRequest : LogInUserRequest = {
      email: credentials.email,
      password: credentials.password
    };
    
    const register = this._api.post('users/Register', credentials);
    const logIn = this.login(logInUserRequest);

    return concat(register, logIn);
  }

  refreshJwt() :Observable<AuthResponse> {
    return this._api.post<any, AuthResponse>('users/refresh', null)
      .pipe(
        tap(this.setTokensExpirationsToLocalStorage)
      );
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.accessTokenExpireAt);
    localStorage.removeItem(LocalStorageKeys.refreshTokenExpireAt);

    return this._api.post('users/logout', {});
  }

  isLoggedIn() :boolean {
    const refreshTokenExpireAtString : string | null = localStorage.getItem(LocalStorageKeys.refreshTokenExpireAt);
    if(!refreshTokenExpireAtString) return false;

    const refreshTokenExpireAt : Date = new Date(refreshTokenExpireAtString);
    return refreshTokenExpireAt.getTime() > new Date().getTime();
  }

  private setTokensExpirationsToLocalStorage(response : AuthResponse) {
    localStorage.setItem(LocalStorageKeys.accessTokenExpireAt, new Date(response.accessTokenExpireAt).toISOString());
    localStorage.setItem(LocalStorageKeys.refreshTokenExpireAt, new Date(response.refreshTokenExpireAt).toISOString());
  }

}
