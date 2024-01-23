import { Component } from '@angular/core';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';
import { CustomerService } from 'src/app/shared/resources/customer.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  customer?: Customer;
  addresses: Address[] = [];
  dependents: Customer[] = [];
  locked: boolean = this.customer ? false : true;

  constructor(private serviceCustomer: CustomerService,
    private serviceAddress: AddressService){}


  reset(): void {
    this.customer = undefined;
    this.addresses = [];
    this.dependents = [];
    this.locked = true;
  }

  newCustomer(value: Customer): void {
    this.serviceCustomer.create(value)
      .subscribe({
        next: (value: Customer) => {
          this.customer = value;
          this.locked = false;
        },
        error: (e) => console.error(e)
      });
  }

  newAddress(value: Address): void{
    this.serviceAddress.create(value, this.customer!.id)
        .subscribe({
          next: (address: Address) => this.addresses.push(address)
        });
  }


  removeAddress(id: number): void{
    this.serviceAddress.deleteById(id)
      .subscribe({
        next: (n: any) => {
          if(n.status == 200){
            this.addresses.filter((value, index) => {
              if(value.id === id){
                this.addresses.splice(index, 1);
              }
            })
          }
        },
        error: (v) => console.error(v),
      })
  }

  newDependent(value: Customer): void{
    this.serviceCustomer.addDependent(value, this.customer!.id)
      .subscribe({
        next: (customer: Customer) => {
          this.dependents.push(customer);
        }
      })
  }

}
