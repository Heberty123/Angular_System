import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent {

  value: string | undefined;
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[];
  @Output() messageClicked = new EventEmitter<Product>();
  @Input() justShow?: boolean;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.findAll()
      .subscribe({
        next: (products: Product[]) => {
          this.dataSource = new MatTableDataSource<Product>(products);
        }
      })
      this.displayedColumns = this.justShow ? ['id', 'name', 'price'] : ['name'];
  }

  applyFilter(): void {
    this.dataSource.filter = this.value!.trim().toLowerCase();
  }

  clickAtRow(row: Product): void {
    this.messageClicked.emit(row);
  }
}
