import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddressComponent } from './list-address.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ListAddressComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ListAddressComponent
  ]
})
export class ListAddressModule { }
