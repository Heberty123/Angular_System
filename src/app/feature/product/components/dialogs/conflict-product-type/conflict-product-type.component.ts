import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formAddressComponent } from 'src/app/feature/customer/components/forms/form-address/form-address.component';

@Component({
  selector: 'app-conflict-product-type',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    formAddressComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './conflict-product-type.component.html',
  styleUrl: './conflict-product-type.component.css'
})
export class ConflictProductTypeComponent {

  constructor(public dialogRef: MatDialogRef<ConflictProductTypeComponent>) {}
}
