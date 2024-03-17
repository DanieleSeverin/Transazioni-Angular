import { Component } from '@angular/core';
import { ReportingService } from '../services/reporting.service';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { AccountsBalanceSummary } from '../models/reporting/account-balance-summary.model';
import { CostsSummary } from '../models/reporting/costs-summary.model';
import { RevenueSummary } from '../models/reporting/revenue-summary.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  AccountsBalanceSummary$ :Observable<Result<AccountsBalanceSummary[]>>;
  CostsSummary$ :Observable<Result<CostsSummary[]>>;
  RevenueSummary$ :Observable<Result<RevenueSummary[]>>;

  constructor(private _reporting : ReportingService) 
  { 
    this.AccountsBalanceSummary$ = _reporting.GetAccountsBalance();
    this.CostsSummary$ = _reporting.GetCosts();
    this.RevenueSummary$ = _reporting.GetRevenue();
  }

}
