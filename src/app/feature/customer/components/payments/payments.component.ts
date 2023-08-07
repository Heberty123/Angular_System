import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';
import { Payment } from 'src/app/shared/interfaces/payment';

let snackBarRef: any;

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input() orders: Order[];
  payments: Payment[] = [];

  constructor(){}


  ngOnInit(): void {
    this.orders.forEach(v => {
      v.payments?.forEach(p => this.payments.push(p));
    });
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }
}
