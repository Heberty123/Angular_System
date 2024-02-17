import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { TableEntitiesComponent } from 'src/app/shared/components/tables/list-customers/table-entities.component';

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
    TableEntitiesComponent
  ]
})
export class RegisterComponent{
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

  toggleSelectable(pointer: TableEntitiesComponent<Customer>): void {
    pointer.selectable = !pointer.selectable;
    if(pointer.selectable === false) {
      pointer.clearSelection();
    }
  }

  teste(pointer: TableEntitiesComponent<Customer>): void {
    console.log(pointer.hasSelected)
  }

  get disabled(): boolean {
    
    console.log("nossssaaaa");
    return false;
  }

  deleteDependents(pointer: TableEntitiesComponent<Customer>) {
    // if(pointer.hasSelected) {
    //   this._customerService.deleteAllById(
    //     selected.map(({ id }) => id!))
    //       .subscribe({
    //         next: () => {
    //           this.dependents = this.dependents
    //             .filter((d) => !selected.includes(d));
    //         }
    //       })
    // }
  }

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
}
