import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { ProductService } from 'src/app/shared/resources/product.service';
import { ChooseCustomerDialogComponent } from '../choose-customer-dialog/choose-customer-dialog.component';

@Component({
  selector: 'dialog-products',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TableEntitiesComponent
  ],
  templateUrl: './dialog-products.component.html',
  styleUrl: './dialog-products.component.css'
})
export class DialogProductsComponent implements OnInit {

  products: SimpleProduct[] = [];

  constructor(public dialogRef: MatDialogRef<ChooseCustomerDialogComponent>,
    private productService: ProductService) {}


  ngOnInit(): void {
    this.productService.findAll()
      .subscribe({
        next: (value: SimpleProduct[]) => this.products = value
      })
  }

}
