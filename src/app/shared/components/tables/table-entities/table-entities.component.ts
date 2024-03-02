import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, Signal, SimpleChanges, WritableSignal, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface objToDisplayColumns {
  [key: string]: string;
}

@Component({
  selector: 'table-entities',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './table-entities.component.html',
  styleUrls: ['./table-entities.component.css']
})
export class TableEntitiesComponent<T> implements OnChanges {

  @Input() data: T[] = [];
  @Output() rowClicked = new EventEmitter<T>();
  @Input() displayColumns: objToDisplayColumns = {'name': 'nome'};
  displayedColumns: string[] = Object.keys(this.displayColumns);
  private _dataSource = new MatTableDataSource<T>(this.data);
  private _selection = new Set<T>();
  private _selectable = 
    this.displayedColumns.includes('select') ?
      true : false;
  private _selectedSignal = signal(this._selection);
  private _hasSelectedSignal = signal(this._selection.size > 0);


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this._dataSource.data = this.data;
    }
    if(changes['displayColumns']) {
      if('select' in this.displayColumns) {
        throw Error("the component cannot be selectable at the beginning");
      }
      else {
        this.displayedColumns = 
          Object.keys(this.displayColumns);
      }
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this._selection.size;
    const numRows = this._dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this._selection.clear();
      this.updateSignals();
      return;
    }

    this._selection =
       new Set<T>([...this._dataSource.data]);
    this.updateSignals();
  }

  toggle(row: T): void {
    this._selection.has(row) ?
      this._selection.delete(row) :
      this._selection.add(row);
    this.updateSignals();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this._selection.has(row) ? 'deselect' : 'select'} row ${row}`;
  }

  protected get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }

  private updateSignals(): void {
    this._selectedSignal.update(s => this._selection);
    this._hasSelectedSignal.set(this._selection.size > 0);
  }

  get selectable(): boolean {
    return this._selectable;
  }

  @Input() set selectable(value: boolean) {
    if(value) {
      if(this._selectable) {
        throw new Error("the component is already selectable");
      }
      else {
        this.displayedColumns.unshift('select');
        this._selectable = true;
      }
    }
    else {
      if(!this._selectable) {
        throw new Error("the component is no longer selectable");
      }
      else {
        this.displayedColumns.shift();
        this._selectable = false
      }
    }
  }

  public selected: Signal<Set<T>> = computed(() => {
    return this._selectedSignal();
  })

  public hasSelected: Signal<boolean> = computed(() => {
    return this._hasSelectedSignal();
  });

  public clearSelection(): void {
    this._selection.clear();
    this.updateSignals();
  }

  @Input() set filterByValue(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  get isEmpty(): boolean {
    return this.dataSource.data.length === 0;
  }
}
