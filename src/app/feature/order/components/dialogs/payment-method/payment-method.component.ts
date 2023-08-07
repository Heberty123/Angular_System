import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OrderDetails } from 'src/app/shared/interfaces/orderDetails';
import { PaymentType } from 'src/app/shared/interfaces/paymentType';
import { PaymentTypeService } from 'src/app/shared/resources/payment-type.service';
import { Payment } from 'src/app/shared/interfaces/payment';
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { TablePaymentModule } from 'src/app/shared/components/tables/table-payment/table-payment.module';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsViewModule } from 'src/app/shared/components/view/order-details-view/order-details-view.module';
import { InputCustomizableModule } from 'src/app/shared/components/input-customizable/input-customizable.module';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatIconModule,
    AdvanceChipListboxComponent,
    TablePaymentModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    OrderDetailsViewModule,
    InputCustomizableModule,
    MatExpansionModule
  ]
})
export class PaymentMethodComponent implements OnInit {

  payments: Payment[] = [];
  paymentTypes?: PaymentType[];
  myGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<PaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetails,
    private paymentTypeService: PaymentTypeService) {
    this.myGroup = new FormGroup({
      installments: new FormControl(null),
      paymentType: new FormControl(null),
      fixedValue: new FormControl(null),
      percentage: new FormControl(null)
    });

    if(data.paymentMethod === 'INCASH')
      this.payments.push({amount: data.netAmount})

    this.installments.valueChanges.subscribe(e => this.updateInstallments())
    this.paymentType.valueChanges.subscribe({
      next: (value: PaymentType) => {
        if(this.payments[0])
          this.payments[0].paymentType = value
      }
    })
  }

  ngOnInit(): void {
    this.paymentTypeService.findAll()
      .subscribe({
        next: (paymentTypes: PaymentType[]) => this.paymentTypes = paymentTypes
      })
  }

  get installments() {
    return this.myGroup.get('installments')!;
  }

  get paymentType() {
    return this.myGroup.get('paymentType')!;
  }

  get fixedValue() {
    return this.myGroup.get('fixedValue')!;
  }

  get percentage() {
    return this.myGroup.get('percentage')!;
  }

  updateInstallments(): void {
    this.payments = [];
    let value: number =
      this.data.netAmount / Number(this.installments.value);

    for (let i: number = 0; i < Number(this.installments.value); i++) {
      this.payments.push({
        amount: value
      })
    }
    this.payments = [...this.payments];
  }


}
