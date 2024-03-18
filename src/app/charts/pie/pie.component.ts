import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PieChartInputData } from 'src/app/models/charts/PieChartInputData.model';
import { CostsSummary } from 'src/app/models/reporting/costs-summary.model';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnChanges {

  @Input() title ?: string;
  @Input() chartData: PieChartInputData[] = [];

  chartOptions? : EChartsOption;

  constructor() { }

  ngOnChanges(changes : SimpleChanges): void {
    if(changes['chartData'] && this.chartData){
      this.chartOptions = this.getChartOptions();
    }
  }

  getChartOptions() : EChartsOption {
    return {
      title: {
        left: '50%',
        text: this.title,
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: this.title,
          type: 'pie',
          radius: '50%',
          data: this.chartData.map( (x : PieChartInputData) => {
            return {
              name: `${x.name}`,
              value: x.value < 0 ? x.value * -1 : x.value
            };
          })
        }
      ]
    };
  }

}
