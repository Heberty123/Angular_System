import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependentsComponent } from './dependents.component';
import { FormCustomerModule } from '../forms/form-customer/form-customer.module';
import { SubCustomersModule } from '../trees/sub-customers/sub-customers.module';



@NgModule({
  declarations: [
    DependentsComponent
  ],
  imports: [
    CommonModule,
    FormCustomerModule,
    SubCustomersModule
  ],
  exports: [
    DependentsComponent
  ]
})
export class DependentsModule { }
