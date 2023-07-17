import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DiscountsDialog } from 'src/app/shared/interfaces/discounts-dialog';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts-dialog.component.html',
  styleUrls: ['./discounts-dialog.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DiscountsDialogComponent {


  quantity: FormControl<number | null>;
  percentage: FormControl<number | null>;
  value: FormControl<number | null>;
  netValue: FormControl<number | null>

  constructor(public dialogRef: MatDialogRef<DiscountsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiscountsDialog) {
    this.quantity = new FormControl(data.quantity, [Validators.max(data.quantity), Validators.min(1)])
    this.percentage = new FormControl(null, [Validators.max(100), Validators.min(0)])
    this.value = new FormControl(null, [Validators.max(data.grossAmount), Validators.min(0)])
    this.netValue = new FormControl(null, [Validators.max(data.grossAmount), Validators.min(0)])
    this.data.percentage = 0.0
  }

  adjustAmount(): void {

    if (this.quantity.value! >= 1 && this.quantity.value! <= this.data.quantity) {
      this.data.netAmount = this.data.grossAmount;
      this.netValue.setValue(null);

      if (this.percentage.value != null && this.percentage.value <= 100)
        this.data.netAmount =
          this.data.grossAmount!
          -
          (this.quantity.value! * this.data.price!) *
          (this.percentage.value / 100.0)


      if (this.value.value != null && this.value.value <= this.data.netAmount)
        this.data.netAmount -=
          (this.quantity.value === this.data.quantity ? 
            this.value.value : this.quantity.value! * this.value.value)

      this.data.percentage =
        1 - (this.data.netAmount! / this.data.grossAmount);
    }
  }

  setNetAmount(): void {
    if (this.netValue.value != null && this.netValue.value <= this.data.grossAmount) {
      this.percentage.setValue(null);
      this.value.setValue(null);
      this.quantity.setValue(this.data.quantity)
      this.data.netAmount = this.netValue.value;
      this.data.percentage =
        1 - (this.data.netAmount! / this.data.grossAmount);
    }
  }
}
