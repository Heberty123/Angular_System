import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { OrderDetails, PaymentMethodComponent } from '../dialogs/payment-method/payment-method.component';
import { Order } from 'src/app/shared/classes/Order';


@Component({
  selector: 'order-section',
  templateUrl: './order-section.component.html',
  styleUrls: ['./order-section.component.css'],
})
export class OrderSectionComponent {

  @Input() order: Order;
  @Output() saveOrder = new EventEmitter<void>();


  constructor(public dialog: MatDialog) {}

}
