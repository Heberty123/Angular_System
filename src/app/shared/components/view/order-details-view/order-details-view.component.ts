import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderDetails } from 'src/app/feature/order/components/dialogs/payment-method/payment-method.component';

@Component({
  selector: 'order-details-view',
  templateUrl: './order-details-view.component.html',
  styleUrls: ['./order-details-view.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class OrderDetailsViewComponent {

  @Input() data: OrderDetails;

  constructor(){}
}
