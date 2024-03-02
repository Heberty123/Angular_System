import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';
import { FormCustomerComponent } from '../../forms/form-customer/form-customer.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormCustomerComponent,
    ReactiveFormsModule
  ]
})
export class EditCustomerComponent {

  customerFC = new FormControl<Customer>({} as Customer);

  constructor(public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
      this.customerFC.patchValue(data);
    }
}
