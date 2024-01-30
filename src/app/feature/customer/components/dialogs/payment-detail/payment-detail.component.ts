import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
  ]
})
export class PaymentDetailComponent {

  paymentTypes: PaymentType[] = [];
  private form = new FormGroup({
    inputValue: new FormControl<number | null>(null, [Validators.required]),
    inputPaymentType: new FormControl<PaymentType | null>(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<PaymentDetailComponent>,
    private paymentTypeService: PaymentTypeService,
    @Inject(MAT_DIALOG_DATA) public data: Payment) {}


  ngOnInit(): void {
    this.paymentTypeService.findAll().subscribe({
      next: (data: PaymentType[]) => this.paymentTypes = data
    })
  }

  payNow(): void {
    if(!this.form.invalid){
      this.data.amountPayed = this.InputValue.value!
      this.data.paymentType = this.InputPaymentType.value!
      if(this.data.amountPayed >= this.data.amount)
        this.data.paid = true
      this.dialogRef.close(this.data);
    }
  }

  get Form(): FormGroup {
    return this.form;
  }

  get InputValue() {
    return this.form.get('inputValue')!
  }

  get InputPaymentType() {
    return this.form.get('inputPaymentType')!
  }
}
