import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { mockStockMarket } from '../shared/models/mock-share-market';
import { ShareMarket } from '../shared/models/share-market';
import { tranformStockDate } from '../shared/utils/common.utils';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private shareMarkets: ShareMarket[] = tranformStockDate(mockStockMarket);
  columnDefs: ColDef[];
  rowData: ShareMarket[];
  gridOptions: GridOptions;
  private gridApi: GridApi;
  private selectedDate: Date | null;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initColumn();
    this.gridOptions = {
      isExternalFilterPresent: () => true,
      doesExternalFilterPass: this.doesExternalFilterPass.bind(this),
    }
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [...this.shareMarkets];
  }

  externalFilterChanged(event: any) {
    this.selectedDate = event.value ? new Date(event.value) : null;
    this.selectedDate?.setHours(0,0,0);
    this.gridApi.onFilterChanged();
  }

  private doesExternalFilterPass(node: RowNode) {
    if (this.selectedDate) {
      const data: ShareMarket = node.data;
      const registeredDate = new Date(data.registered);
      registeredDate.setHours(0, 0, 0);
      return registeredDate.getTime() === this.selectedDate.getTime();
    }
    return true;
  }

  private initColumn() {
    this.columnDefs = [
      /* {
        field: 'isActive',
        width: 100
      }, */
      {
        field: 'company',
        width: 100,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'email',
        filter: 'agTextColumnFilter',
        sortable: true,
        width: 230
      },
      {
        field: 'industryType',
        width: 150,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'phone',
        filter: 'agTextColumnFilter',
        sortable: true,
        width: 180
      },
      {
        field: 'registered',
        width: 150,
        valueFormatter: param => this.datePipe.transform(param.value, 'dd-MM-YYYY') || '',
        sortable: true,
        comparator: (date1: string, date2: string) => new Date(date1).getTime() - new Date(date2).getTime()
      },
      {
        field: 'address'
      },
      {
        field: 'currentPrice',
        sortable: true,
        comparator: this.priceComparator,
        width: 120,
      },
      {
        field: 'price6MonthsAgo',
        sortable: true,
        comparator: this.priceComparator,
        width: 120,
      },
      {
        field: 'price1YearAgo',
        sortable: true,
        comparator: this.priceComparator,
        width: 120,
      },
      {
        field: 'price5YearsAgo',
        sortable: true,
        comparator: this.priceComparator,
        width: 120
      }
    ]
  }

  private priceComparator = (price1: string, price2: string) => {
    const price1$ = +(price1.replace(/(^\$|,)/g, ''));
    const price2$ = +(price2.replace(/(^\$|,)/g, ''));
    return price1$ - price2$;
  }
}
