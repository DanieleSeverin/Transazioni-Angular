import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CostsSummary } from 'src/app/models/reporting/costs-summary.model';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnChanges {

  @Input() chartData ?: any;

  chartOptions? : any;

  constructor() { }

  ngOnChanges(changes : SimpleChanges): void {
    if(changes['chartData'] && this.chartData){
      this.chartOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: 'Costs',
            type: 'pie',
            radius: '50%',
            data: this.chartData.map( (x : any) => {
              return {
                name: `${x.accountName} (${x.currency})`,
                value: x.amount < 0 ? x.amount * -1 : x.amount
              };
            })
          }
        ]
      };
    }
  }

}
