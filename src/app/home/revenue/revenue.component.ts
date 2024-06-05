import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { PieChartInputData } from 'src/app/models/charts/PieChartInputData.model';
import { RevenueSummary } from 'src/app/models/reporting/revenue-summary.model';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent {

  RevenueSummary$ :Observable<RevenueSummary[]>;
  RevenueSummaryPieChartData$ :Observable<PieChartInputData[]>;

  constructor(private _reporting : ReportingService) 
  { 
    this.RevenueSummary$ = _reporting.GetRevenue()
    .pipe(
      shareReplay(1),
      map( x => x.value)
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
