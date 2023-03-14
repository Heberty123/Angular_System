import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from "src/app/shared/interfaces/customer";


@Component({
  selector: 'sub-customers',
  templateUrl: './sub-customers.component.html',
  styleUrls: ['./sub-customers.component.css']
})
export class SubCustomersComponent {
  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['id', 'name', 'cpf'];
  @Input() customersDependents: Customer[];
  @Output() eventCustomerDep = new EventEmitter<Customer>();

  constructor(){}

  ngOnInit(): void {
    /*
    this.dataSource = new MatTableDataSource<Customer>(this.customersDependents);
    */
  }

  saveCustomer(customer: Customer){
    this.eventCustomerDep.emit(customer);
  }

  clickAtRow(row: Customer): void {
    console.log(row);
  }
}
