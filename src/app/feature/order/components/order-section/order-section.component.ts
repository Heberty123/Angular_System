import { Component, EventEmitter, Input, OnChanges, Output, Signal, SimpleChanges, WritableSignal, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductOrder } from 'src/app/shared/classes/ProductOrder';
import { Payment } from 'src/app/shared/interfaces/payment';
import { OrderDetails, PaymentMethodComponent } from '../dialogs/payment-method/payment-method.component';


@Component({
  selector: 'order-section',
  templateUrl: './order-section.component.html',
  styleUrls: ['./order-section.component.css'],
})
export class OrderSectionComponent implements OnChanges {

  @Input() productOrders: ProductOrder[];
  @Input() payments: Payment[];
  @Output() saveOrder = new EventEmitter<void>();
  private _quantity: WritableSignal<number> = signal(0);
  private _grossAmount: WritableSignal<number> = signal(0);
  private _netAmount: WritableSignal<number> = signal(0);
  private _discounts: WritableSignal<number> = signal(0);

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productOrders']) {
      this.updateOrderDetails();
    }
  }

  paymentMethod(): void {
    let orderDetails = new OrderDetails(
      this._quantity(), this._grossAmount(), this._netAmount(), this._discounts())
    const dialogRef = this.dialog.open(PaymentMethodComponent, {
      data: orderDetails,
      width: '80%',
      height: '80%',
      maxWidth: '1000px',
      maxHeight: '700px',
    });
    
    dialogRef.afterClosed().subscribe({
      next: (payments: Payment[]) => 
        // this.updatePayments.emit(payments)
        console.log(payments)
    })
  }

  private updateOrderDetails(): void {
    this.reset();
    this.productOrders.forEach(e => {
      this._quantity.update(q => q + e.quantity);
      this._grossAmount.update(q => q + e.product.price * e.quantity);
      this._netAmount.set(this._grossAmount() - 
        (this._grossAmount() * e.discounts));
    })
    this._discounts.set(1 - (this._netAmount() / this._grossAmount()));
  }

  private reset(): void {
    this._quantity.set(0);
    this._grossAmount.set(0);
    this._netAmount.set(0);
    this._quantity.set(0);
  }

  public quantity: Signal<number> = computed(() => {
    return this._quantity();
  });

  public grossAmount: Signal<number> = computed(() => {
    return this._grossAmount();
  });

  public netAmount: Signal<number> = computed(() => {
    return this._netAmount();
  });


  public discounts: Signal<number> = computed(() => {
    return this._discounts();
  });

}
