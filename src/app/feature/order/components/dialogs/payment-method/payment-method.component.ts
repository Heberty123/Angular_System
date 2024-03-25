import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as moment from 'moment';
import { Order } from 'src/app/shared/classes/Order';
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { TablePaymentComponent } from 'src/app/shared/components/tables/table-payment/table-payment.component';
import { OrderDetailsViewComponent } from 'src/app/shared/components/view/order-details-view/order-details-view.component';
import { Payment } from 'src/app/shared/interfaces/Payment';
import { PaymentType } from 'src/app/shared/interfaces/PaymentType';
import { PaymentTypeService } from 'src/app/shared/resources/payment-type.service';

// export class OrderDetails {
//   quantity: number;
//   grossAmount: number;
//   netAmount: number;
//   discounts: number

//   constructor(order: Order) {
//     this.grossAmount = order.grossAmount;
//     this.netAmount = order.netAmount;
//     this.discounts = order.discounts
//   }
// }

@Component({
  selector: 'payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AdvanceChipListboxComponent,
    TablePaymentComponent,
    OrderDetailsViewComponent,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ]
})
export class PaymentMethodComponent implements OnInit {

  payments: Payment[] = [];
  paymentTypes: PaymentType[] = [];
  input = new FormControl();
  

  constructor(public dialogRef: MatDialogRef<PaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private paymentTypeService: PaymentTypeService) {
  }


  ngOnInit(): void {
    this.paymentTypeService.findAll()
      .subscribe({
        next: (paymentTypes: PaymentType[]) => 
          this.paymentTypes = paymentTypes
      })
      this.input.valueChanges
        .subscribe({
          next: (value: number) => 
            this.updateInstallments(value!)
        })
  }

  changeBttnToggle(event: MatButtonToggleChange) {
    this.payments = [];
    this.input.reset();
    if (event.value === "1")
      this.inCash();
  }

  inCash(): void {
    this.payments = [{
      amount: this.data.netAmount,
      paymentDate: moment().format(),
      paid: false
    }]
  }

  async updateInstallments(qty: number) {
    this.payments = [];
    let value = this.data.netAmount / qty;
    let date = moment();
    // if(!(qty == 1))
    //   date.add(1, 'month');

    for (let i = 0; i < qty; i++) {
      this.payments.push({
        amount: value,
        paymentDate: date.format(),
        paid: false
      })
      date = moment(date.add(1, 'month'));
    }
  }

  canceled(): void {
    this.dialogRef.close(false)
  }

  close(): void {
    this.data.payments = this.payments;
    this.dialogRef.close(true)
  }
}
