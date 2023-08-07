import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubCustomersModule } from '../../components/trees/sub-customers/sub-customers.module';
import { FormCustomerModule } from '../../components/forms/form-customer/form-customer.module';
import { OrdersModule } from '../../components/orders/orders.module';
import { PaymentsModule } from '../../components/payments/payments.module';
import { MatStepperModule } from '@angular/material/stepper';
import { AddressesDetailsModule } from '../../components/addresses-details/addresses-details.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    SubCustomersModule,
    FormCustomerModule,
    OrdersModule,
    PaymentsModule,
    AddressesDetailsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    DetailsComponent
  ],
  providers: []
})
export class DetailsModule { }
