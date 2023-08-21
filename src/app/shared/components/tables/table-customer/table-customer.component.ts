import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.css']
})
export class TableCustomerComponent implements OnInit, OnChanges, AfterViewInit {

  value: string = '';
  @Input() customers: Customer[];
  @Input() onlyNames?: boolean;
  dataSource = new MatTableDataSource<Customer>([]);
  displayedColumns: string[];
  @Output() rowClicked: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["customers"].currentValue != undefined)
      this.dataSource.data = this.customers;
  }

  ngOnInit(): void {
    this.onlyNames ? 
      this.displayedColumns = ['name'] :
      this.displayedColumns = ['id', 'name', 'cpf'];
  }

  filterByValue(): void{
    this.dataSource.filter = this.value.trim().toLowerCase();
  }
}
