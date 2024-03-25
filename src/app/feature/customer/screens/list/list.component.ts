import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjToDisplayColumns } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  customers: Customer[];
  @Output() rowClicked: EventEmitter<Customer> = new EventEmitter<Customer>();
  displayColumns: ObjToDisplayColumns[] = [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'nome' },
    { key: 'cpf', label: 'cpf' }
  ]

  constructor(private _customerService: CustomerService){}

  ngOnInit(): void {
    this._customerService.findAll()
      .subscribe({
        next: (customers: Customer[]) => this.customers = customers
      })
  }
}
