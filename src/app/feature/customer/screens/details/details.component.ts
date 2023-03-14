import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { AddressService } from 'src/app/shared/resources/address.service';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { AddressDeletedComponent } from '../../components/snackbar/address-deleted/address-deleted.component';
import { SelectedTabService } from '../../services/selected-tab.service';

let snackBarRef: any;

@Component({
  selector: 'details-customer',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input() customerSelected: Customer;
  addresses: Address[] = [];
  customersDependents: Customer[] = [];
  toAddAddress: boolean = false;
  toEditCustomer: boolean = false;

  constructor(private _serviceCustomer: CustomerService,
    private _serviceAddress: AddressService,
    private _snackBar: MatSnackBar,
    private selectedTab: SelectedTabService){}

  ngOnInit(): void {
    this._serviceAddress.findAllByCustomerId(this.customerSelected.id)
      .subscribe({
        next: (addresses: Address[]) => { this.addresses = addresses }
      });
    this._serviceCustomer.findAllDependentsCustomersById(this.customerSelected.id)
      .subscribe({
        next: (customers: Customer[]) => { this.customersDependents = customers }
      })
  }

  ngOnDestroy(): void {
    snackBarRef.dismiss();
  }


  addAddress(data: Address){
    this._serviceAddress.create(data, this.customerSelected.id)
      .subscribe({
        next: (value: Address) => { 
          this.addresses.push(value);
          this.toAddAddress = false;
        }
      })
  }


  updateCustomer(value: Customer){
    this._serviceCustomer.updateById(value)
      .subscribe({
        next: (value: Customer) => {
          this.customerSelected = value;
          this.toEditCustomer = false;
        }
      })
  }

  toRemove(): void{
    this._serviceCustomer.deleteById(this.customerSelected.id)
      .subscribe({
        next: () => this.selectedTab.changeToTableCustomers()
      })
  }

  private openSnackBar(address: Address) {
    let haveRetrieved: Boolean;
      snackBarRef = this._snackBar.openFromComponent(AddressDeletedComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      data: {
        address,
        onRetrieve: () => {
          console.log("retrieving");
          haveRetrieved = true;
          this.addresses.push(address);
          snackBarRef.dismiss();
        },
        onClose: () => {
          console.log("the snackBarRef is closing");
          snackBarRef.dismiss();
        }
      }
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if(!haveRetrieved){
        this._serviceAddress.deleteById(address.id)
          .subscribe({
            next: (value: unknown) => { console.log(value) },
            error: (error: any) => { console.error(error) }
          })
      }
    })
  }

  removeAddress(id: number): void{
    this.addresses.filter((value: Address, index: number) => {
      if(value.id === id){
        this.addresses.splice(index, 1);
        this.openSnackBar(value);
      }
    });
  }

  addCustomerDependent(customer: Customer): void{
    this._serviceCustomer.addDependentCustomer(customer, this.customerSelected.id)
      .subscribe({
        next: (customer: Customer) => {
          this.customersDependents.push(customer);
        }
      })
  }
}
