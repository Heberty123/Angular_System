import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormAddressComponent } from 'src/app/feature/customer/components/forms/form-address/form-address.component';

@Component({
  selector: 'app-add-product-type',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormAddressComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-product-type.component.html',
  styleUrl: './add-product-type.component.css'
})
export class AddProductTypeComponent {
  
  input = new FormControl<string>('');

  constructor(public dialogRef: MatDialogRef<AddProductTypeComponent>) {}
}
