import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesModule } from '../tables.module';
import { TableCustomerComponent } from './table-customer.component';



@NgModule({
  declarations: [TableCustomerComponent],
  imports: [
    CommonModule,
    TablesModule,
  ],
  exports: [
    TableCustomerComponent
  ]
})
export class TableCustomerModule { }
