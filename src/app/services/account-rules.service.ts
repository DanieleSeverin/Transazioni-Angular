import { Injectable } from '@angular/core';
import { AccountRule } from '../models/account-rule.model';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountRulesService {

  constructor(private _api : ApiService) { }

  CreateAccountRule(rule : AccountRule) : Observable<Result<AccountRule>> {
    return this._api.post('AccountRules', rule);
  }
}
