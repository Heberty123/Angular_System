import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formAddressComponent } from 'src/app/feature/customer/components/forms/form-address/form-address.component';

@Component({
  selector: 'edit-product-type',
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
  templateUrl: './edit-product-type.component.html',
  styleUrl: './edit-product-type.component.css'
})
export class EditProductTypeComponent {
  
  input = new FormControl<string>('');

  constructor(public dialogRef: MatDialogRef<EditProductTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.input.setValue(data.name)
    }
}
