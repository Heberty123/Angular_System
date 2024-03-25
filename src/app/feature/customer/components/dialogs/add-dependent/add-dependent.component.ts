import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';
import { FormCustomerComponent } from '../../forms/form-customer/form-customer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-dependent',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormCustomerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './add-dependent.component.html',
  styleUrl: './add-dependent.component.css'
})
export class AddDependentComponent {

  customerFC = new FormControl<Customer>({} as Customer);

  constructor(public dialogRef: MatDialogRef<AddDependentComponent>) {}
}
