import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOverviewRemoveCustomer, RemoveCustomerComponent } from './remove-customer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    RemoveCustomerComponent,
    DialogOverviewRemoveCustomer
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    RemoveCustomerComponent
  ]
})
export class RemoveCustomerModule { }
