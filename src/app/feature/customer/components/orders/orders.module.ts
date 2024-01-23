import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { TableOrderModule } from 'src/app/shared/components/tables/table-order/table-order.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MainLoadModule } from 'src/app/shared/components/loaders/main-load/main-load.module';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    TableOrderModule,
    MatButtonToggleModule,
    MainLoadModule,
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
