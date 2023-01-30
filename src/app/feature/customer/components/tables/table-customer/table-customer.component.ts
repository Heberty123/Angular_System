import { Component } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.css']
})
export class TableCustomerComponent {

  dataSource: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'cpf'];

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.customerService.findAll()
      .subscribe(customers => 
        this.dataSource = customers);
  }

  clickAtRow(rows: any): void {
    console.log(rows.name)
  }
}
