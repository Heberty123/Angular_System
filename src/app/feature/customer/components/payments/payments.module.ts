import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { TablePaymentComponent } from 'src/app/shared/components/tables/table-payment/table-payment.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MainLoadModule } from 'src/app/shared/components/loaders/main-load/main-load.module';


@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    TablePaymentComponent,
    MatButtonToggleModule,
    MainLoadModule
  ],
  exports: [
    PaymentsComponent
  ]
})
export class PaymentsModule { }