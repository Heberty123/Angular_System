import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class EditProductComponent implements OnInit{

  productFG = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.productFG.patchValue(this.data, {emitEvent: false});
    });
  }

  onSave(): void {
    this.productFG.markAllAsTouched();
    if(this.productFG.valid) 
      this.dialogRef.close(this.productFG.value)
  }
}
