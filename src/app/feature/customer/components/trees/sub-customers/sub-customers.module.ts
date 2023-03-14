import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCustomersComponent } from './sub-customers.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormCustomerModule } from '../../forms/form-customer/form-customer.module';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    SubCustomersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FormCustomerModule
  ],
  exports: [SubCustomersComponent]
})
export class SubCustomersModule { }
