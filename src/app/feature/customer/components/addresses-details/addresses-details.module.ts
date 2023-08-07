import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressesDetailsComponent } from './addresses-details.component';
import { ListAddressModule } from 'src/app/shared/components/list-address/list-address.module';
import { FormAddressModule } from '../forms/form-address/form-address.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AddressesDetailsComponent
  ],
  imports: [
    CommonModule,
    ListAddressModule,
    FormAddressModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    AddressesDetailsComponent
  ]
})
export class AddressesDetailsModule { }
