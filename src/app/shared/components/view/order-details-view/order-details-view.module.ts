import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsViewComponent } from './order-details-view.component';



@NgModule({
  declarations: [
    OrderDetailsViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderDetailsViewComponent
  ]
})
export class OrderDetailsViewModule { }
