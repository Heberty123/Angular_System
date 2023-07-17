import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { ChooseCustomerDialogComponent } from '../dialogs/choose-customer-dialog/choose-customer-dialog.component';

@Component({
  selector: 'customer-section',
  templateUrl: './customer-section.component.html',
  styleUrls: ['./customer-section.component.css']
})
export class CustomerSectionComponent implements OnInit{

  customer?: Customer;
  @Output() customerEvent: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor(private customerService: CustomerService,
              private dialog: MatDialog){}

  ngOnInit(): void {}

  findCustomer(c: Customer): void {
    this.customerService.findById(c.id)
      .subscribe({
        next: (customer: Customer) => {
          this.customer = customer;
          this.customerEvent.emit(customer);
        }
      })
  }

  openChooseCustomerDialog(): void {
    const dialogRef = this.dialog.open(ChooseCustomerDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (customer: Customer) => {
        if(customer){
          this.findCustomer(customer);
        }
      }
    });
  }
}

