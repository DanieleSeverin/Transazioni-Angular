import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ChartDataItem, ChartInputData } from 'src/app/models/charts/ChartInputData.model';
import { MonthlyAccountBalanceSummary } from 'src/app/models/reporting/account-balance-summary.model';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-accounts-balance',
  templateUrl: './accounts-balance.component.html',
  styleUrls: ['./accounts-balance.component.scss']
})
export class AccountsBalanceComponent {

  AccountsBalanceSummary$ :Observable<MonthlyAccountBalanceSummary[]>;
  AccountsBalanceSummaryChartData$ :Observable<ChartDataItem[]>;
  TotalBalance : Observable<number>;

  constructor(private _reporting : ReportingService) 
  { 
    this.AccountsBalanceSummary$ = _reporting.GetAccountsBalance()
    .pipe(
      shareReplay(1),
      map( x => x.value)
    );

    this.AccountsBalanceSummaryChartData$ = this.AccountsBalanceSummary$
    .pipe(
      map( x => {
        return x.map( y => {
          return {
            accountId: y.accountId,
            accountName: y.accountName,
            month: new Date(y.month).toISOString(),
            cumulativeBalance: y.cumulativeBalance,
          };
        });
      })
    );

    this.TotalBalance = this.AccountsBalanceSummary$
    .pipe(
      map( x => {
        return x.reduce( (acc, val) => acc + val.cumulativeBalance, 0);
      })
    );
  }

}
