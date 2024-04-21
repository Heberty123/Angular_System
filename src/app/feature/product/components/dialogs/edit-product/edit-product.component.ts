import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductFormComponent,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  productFC = new FormControl<Product>({} as Product);

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {
      this.productFC.patchValue(data);
    }
}
