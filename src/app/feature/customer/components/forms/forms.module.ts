import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { FormAddressComponent } from './form-address/form-address.component';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { SharedModule } from 'src/app/shared/shared.module';





@NgModule({
  declarations: [
    FormAddressComponent,
    FormCustomerComponent,
  ],
  imports: [
    CommonModule,
    FormsBasics, 
    SharedModule,
  ],
  exports: [
    FormCustomerComponent,
    FormAddressComponent,
  ],
  providers: []
})
export class FormsModule { }
