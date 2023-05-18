import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOrderComponent } from './table-order.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderSectionModule } from '../../order-section/order-section.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    TableOrderComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    OrderSectionModule,
    MatButtonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    TableOrderComponent
  ]
})
export class TableOrderModule { }
