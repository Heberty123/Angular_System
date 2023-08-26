import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOrderComponent } from './table-order.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    TableOrderComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
    TableOrderComponent
  ]
})
export class TableOrderModule { }
