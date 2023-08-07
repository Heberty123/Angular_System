import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { TablePaymentModule } from 'src/app/shared/components/tables/table-payment/table-payment.module';



@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    TablePaymentModule
  ],
  exports: [
    PaymentsComponent
  ]
})
export class PaymentsModule { }
