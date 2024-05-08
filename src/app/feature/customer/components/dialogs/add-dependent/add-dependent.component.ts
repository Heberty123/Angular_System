import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormCustomerComponent } from '../../forms/form-customer/form-customer.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-dependent',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormCustomerComponent,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-dependent.component.html',
  styleUrl: './add-dependent.component.css'
})
export class AddDependentComponent {

  customerFG = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<AddDependentComponent>) {}

  save(): void {
    this.customerFG.markAllAsTouched();
    if(this.customerFG.valid)
      this.dialogRef.close(this.customerFG.value)
  }
}
