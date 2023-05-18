import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSectionComponent } from './order-section.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    OrderSectionComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    OrderSectionComponent
  ]
})
export class OrderSectionModule { }
