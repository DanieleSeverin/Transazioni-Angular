import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { AccountsBalanceSummary, MonthlyAccountBalanceSummary } from '../models/reporting/account-balance-summary.model';
import { CostsSummary } from '../models/reporting/costs-summary.model';
import { RevenueSummary } from '../models/reporting/revenue-summary.model';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private _api : ApiService) { }

  GetAccountsBalance() :Observable<Result<AccountsBalanceSummary[]>> {
    const url = `reporting/accounts-balance`;
    return this._api.get(url);
  }

  GetMonthlyAccountsBalance() :Observable<Result<MonthlyAccountBalanceSummary[]>> {
    const url = `reporting/monthly-accounts-balance`;
    return this._api.get(url);
  }

  GetCosts() :Observable<Result<CostsSummary[]>> {
    const url = `reporting/costs`;
    return this._api.get(url);
  }

  GetRevenue() :Observable<Result<RevenueSummary[]>> {
    const url = `reporting/revenue`;
    return this._api.get(url);
  }
}
