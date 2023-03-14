import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormAddressModule } from '../../components/forms/form-address/form-address.module';
import { FormCustomerModule } from '../../components/forms/form-customer/form-customer.module';
import { ListAddressModule } from '../../components/lists/list-address/list-address.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SubCustomersModule } from '../../components/trees/sub-customers/sub-customers.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormCustomerModule,
    FormAddressModule,
    ListAddressModule,
    MatStepperModule,
    SubCustomersModule
  ],
  exports: [
    RegisterComponent
  ],
  providers: []
})
export class RegisterModule { }
