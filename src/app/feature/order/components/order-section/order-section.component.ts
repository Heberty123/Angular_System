import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDetails } from 'src/app/shared/interfaces/orderDetails';

@Component({
  selector: 'order-section',
  templateUrl: './order-section.component.html',
  styleUrls: ['./order-section.component.css'],
})
export class OrderSectionComponent {

  @Input() orderDetails?: OrderDetails;
  @Output() saveOrder = new EventEmitter<void>();

  constructor() {}
}
