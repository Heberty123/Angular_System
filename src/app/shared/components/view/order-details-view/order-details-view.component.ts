import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/classes/Order';

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

  @Input() data: Order;

  constructor(){}
}
