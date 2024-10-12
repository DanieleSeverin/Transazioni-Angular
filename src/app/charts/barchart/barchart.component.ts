import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartDataItem, ChartInputData } from 'src/app/models/charts/ChartInputData.model';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnChanges {

  @Input() title ?: string;
  @Input() chartData: ChartDataItem[] = [];

  chartOptions? : EChartsOption;

  constructor() { this.chartOptions = this.getChartOptions();}

  ngOnChanges(changes : SimpleChanges): void {
    if(changes['chartData'] && this.chartData){
      this.chartOptions = this.getChartOptions();
    }
  }
  
  getChartOptions(): EChartsOption {
    // Sort data by month
    const sortedData = [...this.chartData].sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  
    // Extract unique months and account names
    const months = Array.from(new Set(sortedData.map(item => new Date(item.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))));
    const accountNames = Array.from(new Set(sortedData.map(item => item.accountName)));
  
    // Create series data
    const series = accountNames.map(account => ({
      name: account,
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      data: months.map(month => {
        const matchingItem = sortedData.find(item => 
          item.accountName === account && 
          new Date(item.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) === month
        );
        return matchingItem ? matchingItem.cumulativeBalance : 0;
      })
    }));
  
    return {
      title: {
        text: this.title,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: accountNames,
        top: 'bottom'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: series as EChartsOption['series']
    };
  }
}
