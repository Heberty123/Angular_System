import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
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
    MatFormFieldModule, 
    MatInputModule,
    TableEntitiesComponent,
    ReactiveFormsModule,
    FormsBasics
  ]
})
export class ChooseCustomerDialogComponent implements OnInit {

  customers: Customer[];
  customerChoosed?: Customer;
  filterValue: string

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
