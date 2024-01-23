import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleProduct } from 'src/app/shared/interfaces/simpleProduct';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent {

  value: string | undefined;
  dataSource: MatTableDataSource<SimpleProduct>;
  displayedColumns: string[];
  @Output() messageClicked = new EventEmitter<SimpleProduct>();
  @Input() justShow?: boolean;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.findAll()
      .subscribe({
        next: (products: SimpleProduct[]) => {
          this.dataSource = new MatTableDataSource<SimpleProduct>(products);
        }
      })
      this.displayedColumns = this.justShow ? ['id', 'name', 'price'] : ['name'];
  }

  applyFilter(): void {
    this.dataSource.filter = this.value!.trim().toLowerCase();
  }

  clickAtRow(row: SimpleProduct): void {
    this.messageClicked.emit(row);
  }
}
