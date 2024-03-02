import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { AccountsBalanceSummary } from '../models/account-balance-summary.model';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private _api : ApiService) { }

  GetAccountsBalance() :Observable<Result<AccountsBalanceSummary[]>> {
    const url = `reporting/accounts-balance`;
    return this._api.get(url);
  }
}
