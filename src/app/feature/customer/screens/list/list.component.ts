import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { ManagementTabGroupService } from '../../services/management-tab-group.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  customers: Customer[];
  constructor(private _customerService: CustomerService,
    private _managamentTab: ManagementTabGroupService){}

  ngOnInit(): void {
    this._customerService.findAll()
      .subscribe({
        next: (customers: Customer[]) => this.customers = customers
      })
  }

  clickAtRow(row: Customer): void {
    this._managamentTab.setSubDetails(row);
  }
}
