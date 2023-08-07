import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/shared/interfaces/address';
import { AddressService } from 'src/app/shared/resources/address.service';
import { EditAddressComponent } from '../dialogs/edit-address/edit-address.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AddressDeletedComponent } from '../snackbar/address-deleted/address-deleted.component';

let snackBarRef: any;

@Component({
  selector: 'addresses-details',
  templateUrl: './addresses-details.component.html',
  styleUrls: ['./addresses-details.component.css']
})
export class AddressesDetailsComponent implements OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input() customerId: number;
  @Input() data: Address[];
  formOpened: boolean = false;

  constructor(private _addressService: AddressService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

  newAddress(value: Address): void {
    this._addressService.create(value, this.customerId)
      .subscribe({
        next: (address: Address) => {
          this.data.push(address);
          this.formOpened = false;
        }
      })
  }

  updateById(id: number): void {
    let value: Address | undefined =
      this.data.find(value => value.id === id);

    const dialogRef = this.dialog.open(EditAddressComponent, {
      data: value
    });

    dialogRef.afterClosed().subscribe({
      next: (editedAddress: Address) => {
        if (editedAddress) {
          this._addressService.update(editedAddress)
            .subscribe({
              next: (address: Address) => {
                this.data.find((value, index) => {
                  if (value.id === address.id)
                    this.data[index] = address;
                  return;
                })
              }
            })
        }
      }
    });
  }

  removeById(id: number): void {
    this.data.filter((value: Address, index: number) => {
      if (value.id === id) {
        this.data.splice(index, 1);
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
          this.data.push(address);
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
