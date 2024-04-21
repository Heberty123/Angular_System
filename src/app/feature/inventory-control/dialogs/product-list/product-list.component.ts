import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TableEntitiesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: SimpleProduct[] = [];
  columnDisplayed: ObjToDisplayColumns[] = [
    {key: 'id', label: 'Id'},
    {key: 'name', label: 'Nome'},
    {key: 'price', label: 'Preço'}
  ];

  constructor(public dialogRef: MatDialogRef<ProductListComponent>,
    private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.findAll().subscribe({
      next: (value: SimpleProduct[]) => this.products = value })
  }
}
