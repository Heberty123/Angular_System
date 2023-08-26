import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaymentType } from 'src/app/shared/interfaces/paymentType';
import { PaymentTypeService } from 'src/app/shared/resources/payment-type.service';

@Component({
  selector: 'payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    AdvanceChipListboxComponent,
    ReactiveFormsModule
  ]
})
export class PaymentDetailComponent {

  payment: Payment;
  paymentTypes: PaymentType[] = [];
  paymentTypeControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<PaymentDetailComponent>,
    private paymentTypeService: PaymentTypeService,
    @Inject(MAT_DIALOG_DATA) public data: Payment) {
      this.payment = data;
    }


  ngOnInit(): void {
    this.paymentTypeService.findAll().subscribe({
      next: (data) => this.paymentTypes = data
    })

    this.paymentTypeControl.valueChanges.subscribe({
        next: (value: PaymentType) => this.payment.paymentType = value
      })
  }
}
