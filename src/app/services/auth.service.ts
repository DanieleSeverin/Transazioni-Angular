import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LogInUserRequest, RegisterUserRequest } from '../models/auth.model';
import { concat, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = false;

  constructor(private _api : ApiService,
              private _router : Router) 
  {
    this.askServerIfLoggedIn();
  }

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
    return this._api.post('users/logout', {})
      .pipe(
        tap(() => this._loggedIn = false)
      );
  }

  isLoggedIn() {
    return this._loggedIn;
  }

  private askServerIfLoggedIn() {
    this._api.get('users/IsLoggedIn').subscribe({
      next: (response) => {
        this._loggedIn = true;
        const url = this._router.url;

        if(url === '/Login' || url === '/Register') {
          this._router.navigate(['']);
        }
      },
      error: (error) => {
        console.error(error);
        this._loggedIn = false;
        this._router.navigate(['/Login']);
      }
    });
  }
}
