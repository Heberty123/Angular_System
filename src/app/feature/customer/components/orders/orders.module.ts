import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
