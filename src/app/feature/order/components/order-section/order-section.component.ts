import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetails } from 'src/app/shared/interfaces/orderDetails';
import { PaymentMethodComponent } from '../dialogs/payment-method/payment-method.component';
import { Payment } from 'src/app/shared/interfaces/payment';

@Component({
  selector: 'order-section',
  templateUrl: './order-section.component.html',
  styleUrls: ['./order-section.component.css'],
})
export class OrderSectionComponent {

  @Input() orderDetails: OrderDetails;
  @Input() payments: Payment[];
  @Output() updatePayments: EventEmitter<Payment[]> = new EventEmitter<Payment[]>();
  @Output() saveOrder = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  paymentMethod(paymentMethod: string): void {
    this.orderDetails.paymentMethod = 
      paymentMethod

    const dialogRef = this.dialog.open(PaymentMethodComponent, {
      data: this.orderDetails
    });
    
    dialogRef.afterClosed().subscribe({
      next: (payments: Payment[]) => this.updatePayments.emit(payments)
    })
  }
}
