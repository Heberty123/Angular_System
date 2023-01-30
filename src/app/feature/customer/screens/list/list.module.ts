import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCustomerModule } from '../../components/tables/table-customer/table-customer.module';
import { ListComponent } from './list.component';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    TableCustomerModule
  ],
  exports: [ListComponent]
})
export class ListModule { }
