import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCustomerModule } from '../../components/tables/table-customer/table-customer.module';
import { ListComponent } from './list.component';
import { FormTableModule } from '../../components/forms/form-table/form-table.module';
import { InteractionService } from './services/interaction.service';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    TableCustomerModule,
    FormTableModule
  ],
  exports: [ListComponent],
  providers: [InteractionService]
})
export class ListModule { }
