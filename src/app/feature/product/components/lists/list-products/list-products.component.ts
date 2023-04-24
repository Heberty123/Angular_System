import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['id', 'name', 'price'];
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.findAll()
      .subscribe({
        next: (products: Product[]) => {
          this.dataSource = new MatTableDataSource<Product>(products);
        }
      })
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  clickAtRow(row: any): void{
    console.log(row)
  }
}
