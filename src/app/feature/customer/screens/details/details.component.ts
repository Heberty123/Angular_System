import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogConfirmComponent, GeneralDialogData } from 'src/app/shared/components/dialogs/general-dialog-confirm/general-dialog-confirm.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { EditCustomerComponent } from '../../components/dialogs/edit-customer/edit-customer.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'details-customer',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {

  @Input('id') customerID!: number
  customer: Customer;
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private _customerService: CustomerService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
          this.navLinks = [
      {
        label: "Endereços",
        link: "./addresses",
        index: 0
      },
      {
        label: "Dependentes",
        link: "./dependents",
        index: 1
      },
      {
        label: "Pagamentos",
        link: "./payments",
        index: 2
      },
      {
        label: "Pedidos",
        link: "./orders",
        index: 3
      },
    ];
  }

  ngOnInit(): void {
    this.findCustomer(this.customerID);
  }

  findCustomer(id: number): void {
    if (!isNaN(id)) {
      this._customerService.findById(id).subscribe({
        next: (found: Customer) => this.customer = found
      })
    }
  }

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
    let information: GeneralDialogData = {
      title: `Apagar cliente id ${this.customer.id}`,
      description: `Deseja apagar cliente ${this.customer.name}`
    }

    const dialogRef = this.dialog.open(GeneralDialogConfirmComponent, {
      data: information
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result)
          this._customerService.deleteById(this.customer.id!)
            .subscribe({
              next: () => {
                
              }
            })
      }
    });
  }

  ngOnDestroy(): void {}


}
