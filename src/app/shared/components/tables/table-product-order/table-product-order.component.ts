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
import { DialogProductsComponent } from 'src/app/feature/order/components/dialogs/dialog-products/dialog-products.component';
import { DiscountsDialogComponent } from 'src/app/feature/order/components/dialogs/discounts/discounts-dialog.component';
import { DiscountsDialog } from 'src/app/shared/classes/DiscountsDialog';
import { ProductOrder } from 'src/app/shared/classes/ProductOrder';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';


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
  displayedColumns: string[] = ['name', 'price', 'grossAmount', 'netValue', 'discounts', 'quantity', 'options'];
  dataSource = new MatTableDataSource<ProductOrder>([]);
  selection = new SelectionModel<ProductOrder>(true, []);
  @Output() selectedEvent = new EventEmitter<SimpleProduct[]>();
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

  deductProduct(product: ProductOrder): void {
    const dialogRef = this.dialog.open(DiscountsDialogComponent, {
      data: new DiscountsDialog(product)
    });

    dialogRef.afterClosed().subscribe({
      next: (d: DiscountsDialog) => {
        if(d) {
          product.discounts = d.discount
        }
      }
    });
  }

  dialogProducts(): void {
    const dialogRef = this.dialog.open(DialogProductsComponent, {
      width: '80%',
      height: '70%',
      maxWidth: '1000px',
      maxHeight: '700px',
    });
    
    dialogRef.afterClosed().subscribe({
      next: (products: SimpleProduct[]) => 
        this.selectedEvent.next(products)
    })
  }
}
