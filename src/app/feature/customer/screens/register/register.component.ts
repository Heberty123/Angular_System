import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ListAddressComponent } from 'src/app/shared/components/list-address/list-address.component';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { FormCustomerComponent } from '../../components/forms/form-customer/form-customer.component';
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogConfirmComponent, GeneralDialogData } from 'src/app/shared/components/dialogs/general-dialog-confirm/general-dialog-confirm.component';
import { EditAddressComponent } from '../../components/dialogs/edit-address/edit-address.component';
import { formAddressComponent } from '../../components/forms/form-address/form-address.component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormCustomerComponent,
    formAddressComponent,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    ListAddressComponent,
    ReactiveFormsModule,
    TableEntitiesComponent
  ]
})
export class RegisterComponent{
  customerFG = new FormGroup({})
  addressFG = new FormGroup({});
  dependentFG = new FormGroup({})
  addresses: Address[] = [];
  dependents: Customer[] = [];


  constructor(private _customerService: CustomerService,
    private _addressService: AddressService,
    public dialog: MatDialog){
      this.addressFG.disable();
      this.dependentFG.disable();
    }

  saveCustomer(): void {
    this.customerFG.markAllAsTouched();
    if(this.customerFG.valid) {
      this._customerService.save(this.customerFG.value as Customer)
      .subscribe({
        next: (value: Customer) => {
          this.customerFG.patchValue(value);
          this.addressFG.enable();
          this.dependentFG.enable();
        },
        error: (e) => console.error(e)
      });
    }
  }

  saveAddress(): void {
    if(this.addressFG.valid) {
      this._addressService.save(this.addressFG.value, this.customerFG.value as Customer)
      .subscribe({
        next: (address: Address) => this.addresses.push(address)
      });
      this.addressFG.reset();
    }
  }

  saveDependent(): void {
    this.dependentFG.markAllAsTouched();
    if(this.dependentFG.valid) {
      this._customerService.addDependent(
        this.dependentFG.value! as Customer,
        this.customerFG.value! as Customer)
        .subscribe({
          next: (value: Customer) => { 
            this.dependents = [...this.dependents, value];
            this.dependentFG.reset();
          }
        })
    }
  }

  reset(): void {
    this.customerFG.reset()
    this.addressFG.reset()
    this.dependentFG.reset()
    this.addressFG.disable();
    this.dependentFG.disable()
    this.addresses = [];
    this.dependents = [];
  }

  isCustomerEmpty(): boolean {
    let value: Customer = this.customerFG.value as Customer;
    return value.id != undefined;
  }


  toggleSelectable(pointer: TableEntitiesComponent<Customer>): void {
    pointer.selectable = !pointer.selectable;
    if(pointer.selectable === false) {
      pointer.clearSelection();
    }
  }

  deleteDependents(pointer: TableEntitiesComponent<Customer>) {
    let selected: Set<Customer> = pointer.selected();
    if(selected.size) {
      let data: GeneralDialogData = {
        title: "Apagar dependentes",
        description: `Deseja apagar ${selected.size} dependentes?`
      }
      const dialogRef = this.dialog.open(GeneralDialogConfirmComponent, {
        data : data,
      });
      dialogRef.afterClosed()
        .subscribe({
          next: (result: boolean) => {
            if(result) {
              this._customerService.deleteAllById(
                Array.from(selected).map(({ id }) => id!))
                  .subscribe({
                    next: () => {
                      this.dependents = this.dependents
                        .filter((d) => !selected.has(d));
                      pointer.clearSelection();
                    }
                  })
            }
          }
      })
    }    
  }

  updateById(id: number): void {
    let value: Address =
      this.addresses.find(value => value.id === id)!;

    const dialogRef = this.dialog.open(EditAddressComponent, {
      data: value
    });

    dialogRef.afterClosed().subscribe({
      next: (editedAddress: Address) => {
        if (editedAddress) {
          this._addressService.update(editedAddress)
            .subscribe({
              next: (address: Address) => {
                this.addresses.find((value, index) => {
                  if (value.id === address.id)
                    this.addresses[index] = address;
                  return;
                })
              }
            })
        }
      }
    });
  }

  removeAddress(id: number): void{
     this._addressService.deleteById(id)
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
}
