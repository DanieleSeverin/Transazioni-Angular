import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/accounts.model';
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

  CreatePatrimonialAccount(accountName : string) : Observable<Result<Account>> {
    const url = `Accounts/${accountName}/${true}`;
    return this._api.post(url, {isPatrimonial: true});
  }
}
