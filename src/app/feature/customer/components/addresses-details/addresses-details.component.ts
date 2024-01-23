import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/shared/interfaces/address';
import { AddressService } from 'src/app/shared/resources/address.service';
import { EditAddressComponent } from '../dialogs/edit-address/edit-address.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AddressDeletedComponent } from '../snackbar/address-deleted/address-deleted.component';
import { Customer } from 'src/app/shared/interfaces/customer';

let snackBarRef: any;

@Component({
  selector: 'addresses-details',
  templateUrl: './addresses-details.component.html',
  styleUrls: ['./addresses-details.component.css']
})
export class AddressesDetailsComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input() customer: Customer;
  @Input() addresses: Address[] = [];
  formOpened: boolean = false;

  constructor(private _addressService: AddressService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._addressService.findAllByCustomerId(this.customer.id)
      .subscribe({
        next: (data: Address[]) => this.addresses = data
      })
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

  newAddress(value: Address): void {
    this._addressService.create(value, this.customer.id)
      .subscribe({
        next: (address: Address) => {
          this.addresses.push(address);
          this.formOpened = false;
        }
      })
  }

  updateById(id: number): void {
    let value: Address | undefined =
      this.addresses.find(value => value.id === id);

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

  removeById(id: number): void {
    this.addresses.filter((value: Address, index: number) => {
      if (value.id === id) {
        this.addresses.splice(index, 1);
        this.openSnackBar(value);
      }
    });
  }

  private openSnackBar(address: Address) {
    let haveRetrieved: Boolean;
    snackBarRef = this._snackBar.openFromComponent(AddressDeletedComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 8000,
      data: {
        address,
        onRetrieve: () => {
          haveRetrieved = true;
          this.addresses.push(address);
          snackBarRef.dismiss();
        },
        onClose: () => {
          snackBarRef.dismiss();
        }
      }
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (!haveRetrieved) {
        this._addressService.deleteById(address.id)
          .subscribe({
            next: (value: unknown) => { console.log(value) },
            error: (error: any) => { console.error(error) }
          })
      }
    })
  }

}
