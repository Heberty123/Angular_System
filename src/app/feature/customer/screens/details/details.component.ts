import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { GeneralDialogConfirmComponent, GeneralDialogData } from 'src/app/shared/components/dialogs/general-dialog-confirm/general-dialog-confirm.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { AddressesDetailsComponent } from '../../components/addresses-details/addresses-details.component';
import { EditCustomerComponent } from '../../components/dialogs/edit-customer/edit-customer.component';
import { FormCustomerComponent } from '../../components/forms/form-customer/form-customer.component';
import { OrdersComponent } from '../../components/orders/orders.component';
import { PaymentsModule } from '../../components/payments/payments.module';
import { DependentsComponent } from '../../components/dependents/dependents.component';

@Component({
  selector: 'details-customer',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FormCustomerComponent,
    OrdersComponent,
    PaymentsModule,
    AddressesDetailsComponent,
    MatProgressSpinnerModule,
    DependentsComponent
  ]
})
export class DetailsComponent implements OnInit, OnDestroy {

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
        console.log(editedCustomer);
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
                this.eraseCustomer.emit()
                this.toList.emit();
              }
            })
      }
    });
  }

  ngOnDestroy(): void {}

  testeApenas(parent: Customer): void {
    this.customer = parent;
  }

}
