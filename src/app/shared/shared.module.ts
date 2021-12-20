import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const providers = [
  DatePipe
];
const imports = [
  HighchartsChartModule,
  AgGridModule,
  MatTabsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatSelectModule
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
