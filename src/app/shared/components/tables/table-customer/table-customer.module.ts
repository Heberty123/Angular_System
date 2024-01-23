import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCustomerComponent } from './table-customer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [TableCustomerComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule
  ],
  exports: [
    TableCustomerComponent
  ]
})
export class TableCustomerModule { }
