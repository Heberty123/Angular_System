import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableOrderModule } from 'src/app/shared/components/tables/table-order/table-order.module';
import { Order } from 'src/app/shared/interfaces/order';
import { ProductForOrder } from 'src/app/shared/interfaces/productForOrder';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    TableOrderModule
  ]
})
export class OrderDetailsComponent {

  productsOrdered: ProductForOrder[];

  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order){
      data.productsOrders.forEach(p => {
/*        this.productsOrdered.push({
          id: p.product.id,
          name: p.product.name,
          price: p.product.price,
          grossAmount: p.product.price * p.quantity,

        })*/
      })
    }
}
