import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddressComponent } from './list-address.component';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ListAddressComponent],
  imports: [
    CommonModule,
    MatListModule,
    SharedModule
  ],
  exports: [ListAddressComponent]
})
export class ListAddressModule { }
