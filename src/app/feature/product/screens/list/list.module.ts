import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListProductsModule } from '../../components/lists/list-products/list-products.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListProductsModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
