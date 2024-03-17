import { Component } from '@angular/core';
import { ReportingService } from '../services/reporting.service';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { AccountsBalanceSummary } from '../models/account-balance-summary.model';
import { CostsSummary } from '../models/costs-summary.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  AccountsBalanceSummary$ :Observable<Result<AccountsBalanceSummary[]>>;
  CostsSummary$ :Observable<Result<CostsSummary[]>>;

  constructor(private _reporting : ReportingService) 
  { 
    this.AccountsBalanceSummary$ = _reporting.GetAccountsBalance();
    this.CostsSummary$ = _reporting.GetCosts();
  }

}
