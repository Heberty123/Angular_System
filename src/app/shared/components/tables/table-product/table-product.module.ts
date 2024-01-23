import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TableProductComponent } from './table-product.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    TableProductComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    TableProductComponent
  ]
})
export class TableProductModule { }
