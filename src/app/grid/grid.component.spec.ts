import { DatePipe } from '@angular/common';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ShareMarket } from '../shared/models/share-market';
import { SharedModule } from '../shared/shared.module';
import { tranformStockDate } from '../shared/utils/common.utils';

import { GridComponent } from './grid.component';

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

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, NoopAnimationsModule],
        declarations: [
          GridComponent
        ],
        providers: [DatePipe]
      }).compileComponents();
    })
  );

  beforeEach(fakeAsync(
    () => {
      fixture = TestBed.createComponent(GridComponent);
      component = fixture.componentInstance;
      component.rowData = tranformStockDate(shareMarketMock);
      fixture.detectChanges();
      flush();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test column configuration', () => {
    expect(component.columnDefs[0]).toEqual({
      field: 'company',
      width: 100,
      filter: 'agTextColumnFilter',
      sortable: true
    });
    expect(component.columnDefs[1]).toEqual({
      field: 'email',
      filter: 'agTextColumnFilter',
      sortable: true,
      width: 230
    });
  });

  it('should test grid cell value', () => {
    validateGriRow(shareMarketMock[0]);
  });

  it('should test external date filter', () => {
    const event = {
      value: '2017-03-25'
    };
    component.externalFilterChanged(event);
    validateGriRow(shareMarketMock[1]);
  });

  it('should test sort on current price', () => {
    component.rowData = tranformStockDate(shareMarketMock);
    component.gridOptions.columnApi?.applyColumnState({
      state: [{ colId: 'currentPrice', sort: 'desc' }],
      defaultState: { sort: null },
    });
    fixture.detectChanges();
    validateGriRow(shareMarketMock[0]);
  });

  it('should test sort on registered date', () => {
    component.rowData = tranformStockDate(shareMarketMock);
    component.gridOptions.columnApi?.applyColumnState({
      state: [{ colId: 'registered', sort: 'desc' }],
      defaultState: { sort: null },
    });
    fixture.detectChanges();
    validateGriRow(shareMarketMock[1]);
  });

  const validateGriRow = (stock: ShareMarket) => {
    const appElement = fixture.nativeElement;
    const cellElements = appElement.querySelectorAll('.ag-cell-value');
    expect(cellElements[0].textContent).toEqual(stock.company);
    expect(cellElements[1].textContent).toEqual(stock.email);
    expect(cellElements[2].textContent).toEqual(stock.industryType);
    expect(cellElements[3].textContent).toEqual(stock.phone);
  }
});
