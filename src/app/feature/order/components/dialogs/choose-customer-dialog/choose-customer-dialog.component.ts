import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'choose-customer-dialog',
  templateUrl: './choose-customer-dialog.component.html',
  styleUrls: ['./choose-customer-dialog.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TableEntitiesComponent
  ]
})
export class ChooseCustomerDialogComponent implements OnInit {

  customers: Customer[];
  customerChoosed?: Customer;

  constructor(public dialogRef: MatDialogRef<ChooseCustomerDialogComponent>,
              private customerService: CustomerService) {}
  
  ngOnInit(): void {
    this.customerService.findAll()
      .subscribe({
        next: (customers: Customer[]) => this.customers = customers
      })
  }

  customerClicked(customer: Customer): void{
    this.customerChoosed = customer;
  }
}
