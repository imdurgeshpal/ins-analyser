import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { mockStockMarket } from '../shared/models/mock-share-market';
import { ShareMarket } from '../shared/models/share-market';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  shareMarkets: ShareMarket[] = mockStockMarket;
  columnDefs: ColDef[];
  rowData: ShareMarket[];
  gridOptions: GridOptions;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.rowData = [...this.shareMarkets];
    this.initColumn();
  }

  private initColumn() {
    this.columnDefs = [
      {
        field: 'isActive',
        width: 100
      },
      {
        field: 'company',
        width: 100
      },
      {
        field: 'email'
      },
      {
        field: 'industryType',
        width: 150
      },
      {
        field: 'email'
      },
      {
        field: 'phone'
      },
      {
        field: 'registered'
      },
      {
        field: 'address',
        tooltipField: 'address'
      }
    ]
  }

}
