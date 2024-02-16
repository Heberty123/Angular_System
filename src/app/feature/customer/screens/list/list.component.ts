import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  displayColumns = {
    'id': 'id',
    'name': 'nome',
    'cpf': 'cpf'
  }

  constructor(private _customerService: CustomerService){}

  ngOnInit(): void {
    this._customerService.findAll()
      .subscribe({
        next: (customers: Customer[]) => this.customers = customers
      })
  }
}
