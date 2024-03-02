import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductOrder } from 'src/app/shared/classes/ProductOrder';


@Component({
  selector: 'table-product-order',
  templateUrl: './table-product-order.component.html',
  styleUrls: ['./table-product-order.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class TableProductOrderComponent implements OnInit, OnChanges {

  @Input() products: ProductOrder[];
  @Input() editable?: boolean;
  displayedColumns: string[] = ['name', 'price', 'grossAmount', 'netValue', 'discounts', 'promotion', 'quantity', 'options'];
  dataSource = new MatTableDataSource<ProductOrder>([]);
  selection = new SelectionModel<ProductOrder>(true, []);
  @Output() changeQty = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<ProductOrder[]>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if(!this.editable)
      this.displayedColumns.pop()    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'])
      this.dataSource.data = this.products;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: ProductOrder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.product.id + 1}`;
  }


  delete(): void {
    if (this.displayedColumns.includes('select')) {
      this.displayedColumns.shift();
      if (this.selection.hasValue()) {
        this.deleteEvent.emit(this.selection.selected);
        this.selection.clear();
      }
    }
    else
      this.displayedColumns.unshift('select');
  }

  /*  Options operations   */

  returnProduct(product: ProductOrder): void {
    product.isRefund = !product.isRefund;
  }

  // deductProduct(product: ProductOrder): void {
  //   const dialogRef = this.dialog.open(DiscountsDialogComponent, {
  //     data: new DiscountsDialog(product)
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (d: DiscountsDialog) => {
  //       product.discounts = d.discount
  //     }
  //   });
  // }

  editProduct(product: ProductOrder): void {
    console.log(`Editando o produto ${product.product.name}`);
  }
}
