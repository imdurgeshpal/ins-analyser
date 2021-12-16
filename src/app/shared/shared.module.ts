import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTabsModule } from '@angular/material/tabs';

const providers = [
  DatePipe
];
const imports = [
  HighchartsChartModule,
  AgGridModule,
  MatTabsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...imports
  ],
  providers: [
    ...providers
  ],
  exports: [...imports]
})
export class SharedModule { }
