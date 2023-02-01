import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddressItemComponent } from './components/list-address-item/list-address-item.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ListAddressItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ListAddressItemComponent,
    HttpClientModule,
  ],
  providers: []
})
export class SharedModule { }
