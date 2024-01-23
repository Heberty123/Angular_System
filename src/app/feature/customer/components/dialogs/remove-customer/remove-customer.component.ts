import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'remove-customer',
  templateUrl: './remove-customer.component.html',
  styleUrls: ['./remove-customer.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class RemoveCustomerComponent {

  constructor(public dialogRef: MatDialogRef<RemoveCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) { }
}
