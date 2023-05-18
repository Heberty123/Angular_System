import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { TableProductModule } from 'src/app/shared/components/tables/table-product/table-product.module';




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TableProductModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
