import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectChange } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SeriesOptionsType } from 'highcharts';
import { ShareMarket } from '../shared/models/share-market';
import { SharedModule } from '../shared/shared.module';

import { ChartComponent } from './chart.component';


const shareMarketMock = [
  {
    "_id": "5f6c682f89608746f71d69aa",
    "company": "SCENTRIC",
    "isActive": true,
    "currentPrice": "$2,267.54",
    "price1MonthAgo": "$964.34",
    "price6MonthsAgo": "$2,210.00",
    "price1YearAgo": "$1,415.86",
    "price5YearsAgo": "$4,544.07",
    "industryType": "BANKING",
    "email": "robynfranco@scentric.com",
    "phone": "+1 (940) 403-2862",
    "address": "853 Seigel Court, Ripley, Arkansas, 717",
    "about": "Non excepteur exercitation culpa nulla reprehenderit dolor mollit fugiat eu nulla. Amet sint voluptate tempor id mollit mollit. Ex ut ad fugiat laborum dolor laboris qui et Lorem ad esse. Officia id duis magna sit. Magna duis culpa ad sit eiusmod ea pariatur pariatur.\r\n",
    "registered": "2016-02-07T05:51:23 -06:-30"
  },
  {
    "_id": "5f6c682ff22d25db072cecac",
    "company": "CALCULA",
    "isActive": true,
    "currentPrice": "$646.40",
    "price1MonthAgo": "$1,791.95",
    "price6MonthsAgo": "$1,180.94",
    "price1YearAgo": "$865.74",
    "price5YearsAgo": "$382.68",
    "industryType": "INSURANCE",
    "email": "robynfranco@calcula.com",
    "phone": "+1 (990) 440-3160",
    "address": "337 Sackett Street, Newcastle, Minnesota, 816",
    "about": "Proident ipsum laboris nostrud labore deserunt veniam esse dolor duis. Sit nisi esse non Lorem dolor qui est anim laborum eiusmod. Irure cupidatat irure Lorem consectetur officia ullamco eu. Do tempor ullamco amet deserunt. Et cillum in anim irure cupidatat consectetur culpa. Laborum reprehenderit Lorem dolore aute nisi ad ex laboris proident non voluptate deserunt anim nisi. Culpa dolore sint dolor et cupidatat officia ut occaecat.\r\n",
    "registered": "2017-03-25T12:29:38 -06:-30"
  }
] as ShareMarket[];


describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [ChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component['shareMarkets'] = shareMarketMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test chart config', () => {
    expect(component.chartOptions.rangeSelector?.selected).toEqual(5);
  });

  it('should render chart on select stock', () => {
    const event = {
      value: shareMarketMock
    } as MatSelectChange;
    component.selectionChange(event);
    const series = <Array<SeriesOptionsType>>component.chartOptions.series;
    expect(series[0].name).toEqual('SCENTRIC');
    expect(series[0].type).toEqual('line');
  });
});
