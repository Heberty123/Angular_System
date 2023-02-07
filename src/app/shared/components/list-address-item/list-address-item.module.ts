import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddressItemComponent } from './list-address-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ListAddressItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ListAddressItemComponent]
})
export class ListAddressItemModule { }
