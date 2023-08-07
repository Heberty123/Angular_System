import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormAddressModule } from '../../components/forms/form-address/form-address.module';
import { FormCustomerModule } from '../../components/forms/form-customer/form-customer.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SubCustomersModule } from '../../components/trees/sub-customers/sub-customers.module';
import { MatButtonModule } from '@angular/material/button';
import { ListAddressModule } from 'src/app/shared/components/list-address/list-address.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormCustomerModule,
    FormAddressModule,
    MatStepperModule,
    SubCustomersModule,
    MatButtonModule,
    ListAddressModule
  ],
  exports: [
    RegisterComponent
  ],
  providers: []
})
export class RegisterModule { }
