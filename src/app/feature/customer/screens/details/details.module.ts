import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { MatInputModule } from '@angular/material/input';
import { ListAddressItemModule } from 'src/app/shared/components/list-address-item/list-address-item.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListAddressModule } from '../../components/lists/list-address/list-address.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SubCustomersModule } from '../../components/trees/sub-customers/sub-customers.module';
import { RemoveCustomerModule } from '../../components/dialogs/remove-customer/remove-customer.module';
import { FormAddressModule } from '../../components/forms/form-address/form-address.module';
import { FormCustomerModule } from '../../components/forms/form-customer/form-customer.module';
import { OrdersModule } from '../../components/orders/orders.module';
import { PaymentsModule } from '../../components/payments/payments.module';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ListAddressItemModule,
    MatSnackBarModule,
    ListAddressModule,
    MatStepperModule,
    SubCustomersModule,
    RemoveCustomerModule,
    FormAddressModule,
    FormCustomerModule,
    OrdersModule,
    PaymentsModule
  ],
  exports: [
    DetailsComponent
  ],
  providers: []
})
export class DetailsModule { }
