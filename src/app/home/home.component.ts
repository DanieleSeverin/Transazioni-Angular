import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../services/reporting.service';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { AccountsBalanceSummary } from '../models/account-balance-summary.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AccountsBalanceSummary$ :Observable<Result<AccountsBalanceSummary[]>>;

  constructor(private _reporting : ReportingService) 
  { 
    this.AccountsBalanceSummary$ = _reporting.GetAccountsBalance();
  }

  ngOnInit(): void {
  }

}
