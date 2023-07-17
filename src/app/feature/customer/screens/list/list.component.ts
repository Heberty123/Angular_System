import { Component, Input, OnInit } from '@angular/core';
import { SelectedTabService } from '../../services/selected-tab.service';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  
  @Input() value: number;
  customers: Customer[];
  constructor(private customerService: CustomerService,
              private selectedTab: SelectedTabService){}

  ngOnInit(): void {
    this.customerService.findAll()
      .subscribe({
        next: (customers: Customer[]) => this.customers = customers
      })
  }

  clickAtRow(row: Customer): void {
    this.selectedTab.changeToCustomerDetails(row);
  }
}
