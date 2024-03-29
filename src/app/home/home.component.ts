import { Component } from '@angular/core';
import { ReportingService } from '../services/reporting.service';
import { Observable, map, shareReplay } from 'rxjs';
import { AccountsBalanceSummary } from '../models/reporting/account-balance-summary.model';
import { CostsSummary } from '../models/reporting/costs-summary.model';
import { RevenueSummary } from '../models/reporting/revenue-summary.model';
import { PieChartInputData } from '../models/charts/PieChartInputData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  AccountsBalanceSummary$ :Observable<AccountsBalanceSummary[]>;
  CostsSummary$ :Observable<CostsSummary[]>;
  RevenueSummary$ :Observable<RevenueSummary[]>;

  AccountsBalanceSummaryPieChartData$ :Observable<PieChartInputData[]>;
  CostsSummaryPieChartData$ :Observable<PieChartInputData[]>;
  RevenueSummaryPieChartData$ :Observable<PieChartInputData[]>;

  constructor(private _reporting : ReportingService) 
  { 
    this.AccountsBalanceSummary$ = _reporting.GetAccountsBalance()
    .pipe(
      shareReplay(1),
      map( x => x.value)
    );

    this.CostsSummary$ = _reporting.GetCosts()
    .pipe(
      shareReplay(1),
      map( x => x.value)
    );

    this.RevenueSummary$ = _reporting.GetRevenue()
    .pipe(
      shareReplay(1),
      map( x => x.value)
    );

    this.AccountsBalanceSummaryPieChartData$ = this.AccountsBalanceSummary$
    .pipe(
      map( x => {
        return x.map( y => {
          return {
            name: `${y.accountName} (${y.currency})`,
            value: y.balance
          };
        });
      })
    );

    this.CostsSummaryPieChartData$ = this.CostsSummary$
    .pipe(
      map( x => {
        return x.map( y => {
          return {
            name: `${y.accountName} (${y.currency})`,
            value: y.amount
          };
        });
      })
    );

    this.RevenueSummaryPieChartData$ = this.RevenueSummary$
    .pipe(
      map( x => {
        return x.map( y => {
          return {
            name: `${y.accountName} (${y.currency})`,
            value: y.amount
          };
        });
      })
    );
  }

}
