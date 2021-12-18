import { Component, OnInit } from '@angular/core';
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
  seriesOptions: Array<SeriesOptionsType> = [];
  seriesCounter = 0;
  names = ['MSFT', 'AAPL', 'GOOG'];
  private shareMarkets: ShareMarket[] = mockStockMarket;

  chartOptions: Options;

  constructor() { }

  ngOnInit(): void {
    this.tranformData();
  }

  private tranformData() {
    const currentDate = new Date().getTime();
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime();
    const sixMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime();
    const oneYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 12)).getTime();
    const fiveYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 60)).getTime();

    this.shareMarkets.forEach((market, i) => {
      if (i < 5) {
        const arr = [];
        const convertPrice = (price: string): number => +(price.replace(/(^\$|,)/g, ''));
        arr.push(
          [currentDate, convertPrice(market.currentPrice)],
          [oneMonthAgo, convertPrice(market.price1MonthAgo)],
          [sixMonthAgo, convertPrice(market.price6MonthsAgo)],
          [oneYearAgo, convertPrice(market.price1YearAgo)],
          [fiveYearAgo, convertPrice(market.price5YearsAgo)]
        );
        this.seriesOptions.push(
          {
            name: market.company,
            data: arr,
            type: 'line'
          }
        )
      }
    });
    this.createChart();
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
      series: this.seriesOptions
    };
  }
}
