import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'btt-remove',
  templateUrl: './remove-customer.component.html',
  styleUrls: ['./remove-customer.component.css']
})
export class RemoveCustomerComponent {

  @Input() customer: Customer;
  @Output() messageEvent = new EventEmitter<void>();
  constructor(public dialog: MatDialog){}

  removeCustomer(): void {
    const dialogRef = this.dialog.open(DialogOverviewRemoveCustomer, {
      data: this.customer
    })

    dialogRef.afterClosed().subscribe({
        next: (result: Boolean) => {
          if(result)
            this.messageEvent.emit();
        }
    });        
  }
}


@Component({
  selector: 'dialog-overview-remove-customer',
  templateUrl: 'dialog-overview-remove-customer.html',
  styleUrls: ['dialog-overview-remove-customer.css']
})
export class DialogOverviewRemoveCustomer {

  customer: Customer;
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewRemoveCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {this.customer = data;}


  onNoClick(): void{
    this.dialogRef.close();
  }

  toRemove(): void{
    this.dialogRef.close(true);
  }
}