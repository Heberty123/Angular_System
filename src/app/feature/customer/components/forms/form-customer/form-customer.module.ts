import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCustomerComponent } from './form-customer.component';
import { FormsModule } from '../forms.module';



@NgModule({
  declarations: [FormCustomerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormCustomerComponent]
})
export class FormCustomerModule { }
