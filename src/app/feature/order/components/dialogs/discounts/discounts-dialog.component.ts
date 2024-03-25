import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DiscountsDialog } from 'src/app/shared/classes/DiscountsDialog';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid);
  }
}

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


  form: FormGroup<any>
  matcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<DiscountsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiscountsDialog) {
    this.form = new FormGroup<any>({
      percentageQty: new FormControl(data.quantity, [Validators.max(data.quantity), Validators.min(1)]),
      percentage: new FormControl(null, [Validators.max(100), Validators.min(0)]),
      valueQty: new FormControl(data.quantity, [Validators.max(data.quantity), Validators.min(1)]),
      value: new FormControl(null, [Validators.min(0)]),
      netValue: new FormControl(null, [Validators.max(data.grossAmount), Validators.min(0)])
    })

  }

  adjustAmount(): void {
    if (this.form.valid) {
      this.data.netAmount = this.data.grossAmount;
      this.netValue.setValue(null);
      this.adjustPercentage();
      this.adjustValue();
      this.adjustDiscount();
    }
  }

  private adjustPercentage(): void {
    this.data.netAmount = this.data.grossAmount -
    (this.percentageQty.value! * this.data.price!) *
    (this.percentage.value / 100.0)
    this.value.addValidators(Validators.max(this.data.netAmount))
  }

  private adjustValue(): void {
      this.data.netAmount -=
        this.valueQty.value! * this.value.value;
  }


  setNetAmount(): void {
    if (this.netValue.valid) {
      this.percentageQty.reset()
      this.percentage.reset()
      this.valueQty.reset()
      this.value.reset()
      this.data.netAmount = this.netValue.value;
      this.adjustDiscount();
    }
  }

  private adjustDiscount(): void {
    this.data.discount =
    1 - (this.data.netAmount! / this.data.grossAmount);
  }

  get percentageQty() {
    return this.form.get('percentageQty')!;
  }

  get percentage(){
    return this.form.get('percentage')!;
  }

  get valueQty(){
    return this.form.get('valueQty')!;
  }

  get value(){
    return this.form.get('value')!;
  }

  get netValue(){
    return this.form.get('netValue')!;
  }
}
