import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from '../../components/dialogs/edit-customer/edit-customer.component';
import { FullCustomer } from 'src/app/shared/interfaces/full-customer';
import { RemoveCustomerComponent } from '../../components/dialogs/remove-customer/remove-customer.component';

@Component({
  selector: 'details-customer',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  @Input() customer: Customer;
  @Output() eraseCustomer = new EventEmitter<void>()
  @Output() toList = new EventEmitter<void>()

  constructor(private _customerService: CustomerService,
    public dialog: MatDialog) { }

  ngOnInit(): void {}

  openEditCustomer(): void {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: this.customer
    });

    dialogRef.afterClosed().subscribe({
      next: (editedCustomer: Customer) => {
        if (editedCustomer)
          this._customerService.update(editedCustomer)
            .subscribe({
              next: (value: Customer) => this.customer = value
            })
      }
    });
  }


  openRemoveCustomer(): void {
    const dialogRef = this.dialog.open(RemoveCustomerComponent, {
      data: this.customer
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result)
          this._customerService.deleteById(this.customer.id)
            .subscribe({
              next: (value: unknown) => {
                this.eraseCustomer.emit()
                this.toList.emit();
              }
            })
      }
    });
  }

}
