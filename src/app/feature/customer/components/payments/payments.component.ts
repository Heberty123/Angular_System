import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
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
  displayedColumns: string[] = ['amount', 'paymentDate'];

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

  bttnToggleChange(bttn: MatButtonToggleChange){
    if(bttn.value === '1')
      this.displayedColumns.splice(-3);
    else
      this.displayedColumns.push('paymentType', 'payedAt', 'amountPayed');
  }

}