import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as moment from 'moment';
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { TablePaymentComponent } from 'src/app/shared/components/tables/table-payment/table-payment.component';
import { OrderDetailsViewComponent } from 'src/app/shared/components/view/order-details-view/order-details-view.component';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaymentType } from 'src/app/shared/interfaces/paymentType';
import { PaymentTypeService } from 'src/app/shared/resources/payment-type.service';

export class OrderDetails {
  quantity: number;
  grossAmount: number;
  netAmount: number;
  discounts: number

  constructor(
    quantity: number,
     grossAmount: number,
      netAmount: number,
       discount: number) {
    this.quantity = quantity,
    this.grossAmount = grossAmount;
    this.netAmount = netAmount;
    this.discounts = discount
  }
}

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
  paymentTypes: PaymentType[];
  paymentType = new FormControl();
  inputValue: FormControl<number> = new FormControl();
  displayedColumns: string[];
  paymentMethod: string;
  changeAmount: number;
  missing: number;


  constructor(public dialogRef: MatDialogRef<PaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetails,
    public dialog: MatDialog,
    private paymentTypeService: PaymentTypeService) {
  }


  ngOnInit(): void {
    this.paymentTypeService.findAll()
      .subscribe({
        next: (paymentTypes: PaymentType[]) => this.paymentTypes = paymentTypes
      })

    this.inputValue.valueChanges.subscribe({
      next: (value: number) => {
        this.changePaymentFunction(0, 0);
        if (this.paymentMethod === 'inCash') 
          this.changePaymentFunction(this.data.netAmount, value);
        else 
          this.updateInstallments(+value);
      }
    })

    this.paymentType.valueChanges.subscribe({
      next: (value: PaymentType) => this.payments[0].paymentType = value
    })
  }


  async updateInstallments(qty: number): Promise<void> {
    this.payments = [];
    let value: number =
      this.data.netAmount / qty;
    let date: moment.Moment = moment();
    date.add(1, 'month');

    for (let i: number = 0; i < qty; i++) {
      this.payments.push({
        amount: value,
        paymentDate: date.format(),
        paid: false
      })
      date = moment(date.add(1, 'month'));
    }
  }

  resetPayments(): void {
    this.updateInstallments(+this.inputValue.value);
  }

  changePaymentFunction(total: number, value: number): void {
    
    let result = total - value;
    if (Math.sign(result) === -1)
      this.changeAmount = result * (-1)
    else
      this.changeAmount = 0;

    if (Math.sign(result) === 1)
      this.missing = result
    else
      this.missing = 0;
  }

  cashPayment(): void {
    let payment: Payment = this.payments[0];
    if (payment.paymentType != undefined && payment.amount <= +this.inputValue.value) {

      payment.amountPayed = +this.inputValue.value;
      payment.paid = true;
    }
  }

  changeBttnToggle(event: MatButtonToggleChange) {
    this.paymentMethod = event.value
    this.payments = [];
    this.inputValue.reset()
    if (event.value === "inCash") {
      this.payments.push({
        amount: this.data.netAmount,
        paymentDate: moment().format(),
        paid: false
      })
      this.displayedColumns = ['amount', 'paymentDate', 'paymentType'];
    }
    else {
      this.displayedColumns = ['amount', 'paymentDate', 'paymentType', 'options', 'expand'];
    }
  }
}
