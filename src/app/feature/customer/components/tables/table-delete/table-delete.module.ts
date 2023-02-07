import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesModule } from '../tables.module';
import { TableDeleteComponent } from './table-delete.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [TableDeleteComponent],
  imports: [
    CommonModule,
    TablesModule,
    MatCheckboxModule
  ],
  exports: [TableDeleteComponent]
})
export class TableDeleteModule { }
