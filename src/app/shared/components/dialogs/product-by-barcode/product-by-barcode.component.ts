import { CommonModule } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, Component, Inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'product-by-barcode-component',
  templateUrl: './product-by-barcode.component.html',
  styleUrls: ['./product-by-barcode.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProductByBarcodeComponent {
  constructor(public dialogRef: MatDialogRef<ProductByBarcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
