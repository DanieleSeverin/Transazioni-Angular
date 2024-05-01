import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { PieChartInputData } from 'src/app/models/charts/PieChartInputData.model';
import { CostsSummary } from 'src/app/models/reporting/costs-summary.model';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent {

  CostsSummary$ :Observable<CostsSummary[]>;
  CostsSummaryPieChartData$ :Observable<PieChartInputData[]>;

  constructor(private _reporting : ReportingService) 
  { 
    this.CostsSummary$ = _reporting.GetCosts()
    .pipe(
      shareReplay(1),
      map( x => x.value)
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
  }

}
