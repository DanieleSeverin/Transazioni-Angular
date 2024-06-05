import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LogInUserRequest, RegisterUserRequest } from '../models/auth.model';
import { concat, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = false;

  constructor(private _api : ApiService) { }

  login(credentials : LogInUserRequest) {
    return this._api.post('users/Login', credentials)
      .pipe(
        tap(() => this._loggedIn = true)
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

  refreshJwt() {
    return this._api.get('users/Refresh');
  }

  logout() {
    return this._api.get('users/logout')
      .pipe(
        tap(() => this._loggedIn = false)
      );
  }

  isLoggedIn() {
    return this._loggedIn;
  }
}
