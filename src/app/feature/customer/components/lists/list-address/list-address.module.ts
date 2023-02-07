import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddressComponent } from './list-address.component';
import { MatListModule } from '@angular/material/list';
import { ListAddressItemModule } from 'src/app/shared/components/list-address-item/list-address-item.module';


@NgModule({
  declarations: [ListAddressComponent],
  imports: [
    CommonModule,
    MatListModule,
    ListAddressItemModule
  ],
  exports: [ListAddressComponent]
})
export class ListAddressModule { }
