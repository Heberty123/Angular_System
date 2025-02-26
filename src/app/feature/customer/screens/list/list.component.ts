import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ObjToDisplayColumns } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  router = inject(Router)
  customers: Customer[];
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

  findOne(customer: Customer): void {
    this.router.navigate([`/customer/${customer.id}`])
  }
}
