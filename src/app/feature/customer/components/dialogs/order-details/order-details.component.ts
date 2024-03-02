import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Order } from 'src/app/shared/classes/Order';
import { ProductForOrder } from 'src/app/shared/classes/ProductForOrder';
import { TableProductOrderComponent } from 'src/app/shared/components/tables/table-product-order/table-product-order.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  TableProductOrderComponent
  ]
})
export class OrderDetailsComponent {

  productsOrdered: ProductForOrder[] = [];

  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order) { }


  // ngOnInit(): void {
  //   let totalAmount: number;
  //   this.data.productOrders.forEach(p => {
  //     totalAmount = p.product.price * p.quantity;
  //     // this.productsOrdered.push({
  //     //   id: p.product.id,
  //     //   name: p.product.name,
  //     //   price: p.product.price,
  //     //   grossAmount: totalAmount,
  //     //   netAmount: totalAmount - (totalAmount * p.discounts),
  //     //   quantity: p.quantity,
  //     //   discounts: p.discounts,
  //     //   promotion: 0,
  //     //   isRefund: p.isRefund
  //     // })
  //   })
  // }
}
