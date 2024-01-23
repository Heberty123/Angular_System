import { Component, Input } from '@angular/core';
import { OrderDetails } from 'src/app/shared/interfaces/orderDetails';

@Component({
  selector: 'order-details-view',
  templateUrl: './order-details-view.component.html',
  styleUrls: ['./order-details-view.component.css']
})
export class OrderDetailsViewComponent {

  @Input() data: OrderDetails;

  constructor(){}
}
