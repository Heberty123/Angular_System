import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
