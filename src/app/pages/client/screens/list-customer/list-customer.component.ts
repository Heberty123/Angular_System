import {Component, OnInit} from '@angular/core';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/resources/customer.service';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  dataSource: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'cpf'];

  constructor(private customerService:CustomerService){}

  ngOnInit(): void {
    this.customerService.findAll()
      .subscribe(customers => 
        this.dataSource = customers);
  }

  clickAtRow(rows: any): void {
    console.log(rows.name)
  }
}
