import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductForOrder } from 'src/app/shared/interfaces/productForOrder';
import { DiscountsDialogComponent } from '../dialogs/discounts/discounts-dialog.component';
import { DiscountsDialog } from 'src/app/shared/interfaces/discounts-dialog';


@Component({
  selector: 'table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.css']
})
export class TableOrderComponent implements OnChanges {

  @Input() products: ProductForOrder[];
  displayedColumns: string[] = ['name', 'price', 'grossAmount', 'netValue', 'discounts', 'promotion', 'quantity', 'options'];
  dataSource = new MatTableDataSource<ProductForOrder>([]);
  selection = new SelectionModel<ProductForOrder>(true, []);
  @Output() changeQty = new EventEmitter<ProductForOrder>();
  @Output() updateList = new EventEmitter<ProductForOrder>();
  @Output() deleteEvent = new EventEmitter<ProductForOrder[]>();

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'])
      this.dataSource.data = this.products;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductForOrder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

  setQuantity(product: ProductForOrder): void {
    this.changeQty.emit(product);
  }

  /*  Options operations   */

  returnProduct(product: ProductForOrder): void {
    product.isRefund = !product.isRefund;
    this.updateList.emit();
  }

  deductProduct(product: ProductForOrder): void {
    let discDialog: DiscountsDialog = {
      name: product.name,
      grossAmount: product.grossAmount,
      netAmount: product.grossAmount,
      price: product.price,
      quantity: product.quantity
    }

    const dialogRef = this.dialog.open(DiscountsDialogComponent, {
      data: discDialog
    });

    dialogRef.afterClosed().subscribe({
      next: (d: DiscountsDialog) => {
        product.discounts = d.percentage!
        product.netAmount = d.netAmount!
        this.updateList.emit();
      }
    });
  }

  editProduct(product: ProductForOrder): void {
    console.log(`Editando o produto ${product.name}`);
  }
}
