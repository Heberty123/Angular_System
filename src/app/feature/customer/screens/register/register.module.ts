import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '../../components/forms/forms.module';
import { DisableComponentsService } from './services/disable-address.service';
import { FormAddressModule } from '../../components/forms/form-address/form-address.module';
import { FormCustomerModule } from '../../components/forms/form-customer/form-customer.module';
import { ListAddressModule } from '../../components/lists/list-address/list-address.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormCustomerModule,
    FormAddressModule,
    ListAddressModule
  ],
  exports: [
    RegisterComponent
  ],
  providers: [DisableComponentsService]
})
export class RegisterModule { }
