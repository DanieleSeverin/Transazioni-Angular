import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, CreateAccountRequest } from '../models/accounts.model';
import { Result } from '../models/result.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _api : ApiService) { }

  GetAccounts(onlyPatrimonial? : boolean) : Observable<Result<Account[]>> {
    let url = `Accounts`;
    if(onlyPatrimonial){
      url = `${url}?onlyPatrimonial=true`;
    }
    return this._api.get(url);
  }

  CreateAccount(account : CreateAccountRequest) : Observable<Result<Account>> {
    return this._api.post('Accounts', account);
  }
}
