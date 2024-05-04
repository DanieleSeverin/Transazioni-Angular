import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LogInUserRequest, RegisterUserRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _api : ApiService) { }

  login(credentials : LogInUserRequest) {
    return this._api.post('users/Login', credentials);
  }

  register(credentials : RegisterUserRequest) {
    return this._api.post('users/Register', credentials);
  }

  refreshJwt() {
    return this._api.get('users/Refresh');
  }
}
