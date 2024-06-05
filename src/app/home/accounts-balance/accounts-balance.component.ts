import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { PieChartInputData } from 'src/app/models/charts/PieChartInputData.model';
import { AccountsBalanceSummary } from 'src/app/models/reporting/account-balance-summary.model';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-accounts-balance',
  templateUrl: './accounts-balance.component.html',
  styleUrls: ['./accounts-balance.component.scss']
})
export class AccountsBalanceComponent {

  AccountsBalanceSummary$ :Observable<AccountsBalanceSummary[]>;
  AccountsBalanceSummaryPieChartData$ :Observable<PieChartInputData[]>;
  TotalBalance : Observable<number>;

  constructor(private _reporting : ReportingService) 
  { 
    this.AccountsBalanceSummary$ = _reporting.GetAccountsBalance()
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

    this.TotalBalance = this.AccountsBalanceSummary$
    .pipe(
      map( x => {
        return x.reduce( (acc, val) => acc + val.balance, 0);
      })
    );
  }

}
