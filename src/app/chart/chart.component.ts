import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import * as Highcharts from "highcharts/highstock";
import { Options, SeriesOptionsType } from 'highcharts/highstock';
import { mockStockMarket } from '../shared/models/mock-share-market';
import { ShareMarket } from '../shared/models/share-market';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  shareMarkets: ShareMarket[] = mockStockMarket;

  chartOptions: Options;
  updateFlag: boolean;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  selectionChange(event: MatSelectChange) {
    this.tranformData(event.value);
  }

  private tranformData(stockData: ShareMarket[]) {
    const currentDate = new Date().getTime();
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
    const sixMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime();
    const oneYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 12)).getTime();
    const fiveYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 60)).getTime();
    const seriesOptions: Array<SeriesOptionsType> = [];
    stockData.forEach((market, i) => {
      const arr = [];
      const convertPrice = (price: string): number => +(price.replace(/(^\$|,)/g, ''));
      arr.push(
        [fiveYearAgo, convertPrice(market.price5YearsAgo)],
        [oneYearAgo, convertPrice(market.price1YearAgo)],
        [sixMonthAgo, convertPrice(market.price6MonthsAgo)],
        [oneMonthAgo, convertPrice(market.price1MonthAgo)],
        [currentDate, convertPrice(market.currentPrice)],
      );
      seriesOptions.push(
        {
          name: market.company,
          data: arr,
          type: 'line'
        }
      )
    });
    this.chartOptions.series = seriesOptions;
    this.updateFlag = true;
  }


  private createChart() {
    this.chartOptions = {
      rangeSelector: {
        selected: 5
      },
      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },
      series: []
    };
  }
}
