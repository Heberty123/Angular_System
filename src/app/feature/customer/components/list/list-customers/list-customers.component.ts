import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'list-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit, OnChanges {

  @Input() data: Customer[] = []
  @Output() deleteEvent = new EventEmitter<Customer[]>();
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<Customer>(this.data);
  selection = new SelectionModel<Customer>(true, []);

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'])
    this.dataSource.data = this.data;
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
  checkboxLabel(row?: Customer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
}
