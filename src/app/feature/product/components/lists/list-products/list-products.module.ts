import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ListProductsComponent
  ]
})
export class ListProductsModule { }
