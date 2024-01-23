import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDeleteComponent } from './table-delete.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [TableDeleteComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [TableDeleteComponent]
})
export class TableDeleteModule { }
