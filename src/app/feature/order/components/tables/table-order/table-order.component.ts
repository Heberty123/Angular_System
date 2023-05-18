import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductOrder } from 'src/app/shared/interfaces/productOrder';

@Component({
  selector: 'table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.css']
})
export class TableOrderComponent implements OnChanges {

  @Input() products: ProductOrder[];
  displayedColumns: string[] = ['name', 'productType', 'brand', 'price', 'quantity'];
  dataSource = new MatTableDataSource<ProductOrder>([]);
  selection = new SelectionModel<ProductOrder>(true, []);
  @Output() updateItem = new EventEmitter<ProductOrder>();
  @Output() deleteEvent = new EventEmitter<ProductOrder[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['products']){
      this.dataSource.data = this.products;
      console.log("fui chamado!");
    }
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
  checkboxLabel(row?: ProductOrder): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onQuantityChanged(product: ProductOrder): void {
    this.updateItem.emit(product);
  }

  delete(): void{
    if(this.displayedColumns.includes('select')){
      this.displayedColumns = ['name', 'productType', 'brand', 'price', 'quantity'];
      if(this.selection.hasValue()){
        this.deleteEvent.emit(this.selection.selected);
        this.selection.clear();
      }
    }
    else
      this.displayedColumns = ['select', 'name', 'productType', 'brand', 'price', 'quantity'];
  }
}
