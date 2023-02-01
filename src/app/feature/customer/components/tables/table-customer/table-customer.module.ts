import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesModule } from '../tables.module';
import { TableCustomerComponent } from './table-customer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [TableCustomerComponent],
  imports: [
    CommonModule,
    TablesModule,
    MatProgressSpinnerModule
  ],
  exports: [
    TableCustomerComponent
  ]
})
export class TableCustomerModule { }
