import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.css']
})
export class TableCustomerComponent implements OnInit, OnChanges {

  value: string = '';
  @Input() customers: Customer[];
  @Input() onlyNames?: boolean;
  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[];
  @Output() rowClicked: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["customers"].currentValue != undefined)
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
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
