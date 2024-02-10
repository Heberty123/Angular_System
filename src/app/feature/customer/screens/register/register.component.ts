import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ListAddressComponent } from 'src/app/shared/components/list-address/list-address.component';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { FormAddressComponent } from '../../components/forms/form-address/form-address.component';
import { FormCustomerComponent } from '../../components/forms/form-customer/form-customer.component';
import { ListCustomersComponent } from '../../components/list/list-customers/list-customers.component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormCustomerComponent,
    FormAddressComponent,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    ListAddressComponent,
    ReactiveFormsModule,
    ListCustomersComponent
  ]
})
export class RegisterComponent {

  customerFC = new FormControl<Customer>({} as Customer);
  addressFC = new FormControl<Address>({} as Address);
  dependentFC = new FormControl<Customer>({} as Customer);
  addresses: Address[] = [];
  dependents: Customer[] = [];

  constructor(private _customerService: CustomerService,
    private _addressService: AddressService){
      this.addressFC.disable();
      this.dependentFC.disable();
    }

  saveCustomer(): void {
    if(this.customerFC.valid) {
      this._customerService.save(this.customerFC.value)
      .subscribe({
        next: (value: Customer) => {
          this.customerFC.setValue(value);
          this.addressFC.enable();
          this.dependentFC.enable();
        },
        error: (e) => console.error(e)
      });
    }
  }

  saveAddress(): void {
    if(this.addressFC.valid) {
      this._addressService.save(this.addressFC.value, this.customerFC.value!.id!)
      .subscribe({
        next: (address: Address) => this.addresses.push(address)
      });
      this.addressFC.reset();
    }
  }

  saveDependent(): void {
    if(this.dependentFC.valid) {
      this._customerService.addDependent(
        this.dependentFC.value!,
        this.customerFC.value!.id!)
        .subscribe({
          next: (value: Customer) => { 
            this.dependents = [...this.dependents, value];
            this.dependentFC.reset();
          }
        })
    }
  }

  reset(): void {
    this.customerFC.reset()
    this.addressFC.reset()
    this.dependentFC.reset()
    this.addressFC.disable();
    this.dependentFC.disable()
    this.addresses = [];
    this.dependents = [];
  }

    // addDeliveryType(): void {
  //   const dialogRef = this.dialog.open(AddDeliveryTypeDialogComponent);

  //   dialogRef.afterClosed().subscribe({
  //     next: (result: string) => {
  //       if (result) {
  //         this.deliveryTypeService.save({ name: result })
  //           .subscribe({
  //             next: (deliveryType: DeliveryType) => this.deliveries.push(deliveryType)
  //           })
  //       }
  //     }
  //   });
  // }

    // searchByCEF(): void {

  // }


  // removeAddress(id: number): void{
  //   this.serviceAddress.deleteById(id)
  //     .subscribe({
  //       next: (n: any) => {
  //         if(n.status == 200){
  //           this.addresses.filter((value, index) => {
  //             if(value.id === id){
  //               this.addresses.splice(index, 1);
  //             }
  //           })
  //         }
  //       },
  //       error: (v) => console.error(v),
  //     })
  // }

  // newDependent(value: Customer): void{
  //   this.serviceCustomer.addDependent(value, this.customer!.id!)
  //     .subscribe({
  //       next: (customer: Customer) => {
  //         this.dependents.push(customer);
  //       }
  //     })
  // }

  // teste(): void {
  //   console.log(`Is invalid: ${this.customerFormControl.invalid}`)
  //   console.log(this.customerFormControl.value)
  //   this.customerFormControl.clearValidators();
  //   this.customerFormControl.markAllAsTouched();
  // }

}
