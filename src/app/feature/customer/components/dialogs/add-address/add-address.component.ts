import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { DeliveryType } from 'src/app/shared/interfaces/delivery-type';
import { AddressService } from 'src/app/shared/resources/address.service';


@Component({
  selector: 'dialog-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {

  @Input() customer: Customer;
  @Output() messageEvent = new EventEmitter<Address>();
  constructor(public dialog: MatDialog) {}

  add_Address(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.customer
    })

    dialogRef.afterClosed().subscribe({
        next: (result: Address) => {
          if(result != null)
            this.messageEvent.emit(result);
        }
      });        
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogOverviewExampleDialog implements OnInit {

  customer: Customer;
  form: FormGroup;
  deliveries: DeliveryType[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private service: AddressService
  ) {this.customer = data;}

  ngOnInit(): void {

    this.form = new FormGroup({
      cep: new FormControl('', ),
      street: new FormControl('', Validators.required),
      number: new FormControl('', ),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
      deliveryType: new FormControl('', Validators.required),
      cellphone1: new FormControl('', ),
      cellphone2: new FormControl('', ),
      telephone1: new FormControl('', ),
      telephone2: new FormControl('', )
    });

    this.service.findAllDeliveryType()
      .subscribe({
        next: (value: DeliveryType[]) => { this.deliveries = value }
      });
  }

  searchByCPF(): void{
    this.service.searchByCPF(this.cep?.value)
      .subscribe({
        next: (value: any) => {
          this.cep.setValue(value.cep),
          this.street.setValue(value.logradouro),
          this.neighborhood.setValue(value.bairro),
          this.city.setValue(value.localidade),
          this.uf.setValue(value.uf)
        }
      })
  }

  get cep() {
    return this.form.get('cep')!;
  }

  get street() {
    return this.form.get('street')!;
  }

  get number() {
    return this.form.get('number')!;
  }

  get neighborhood() {
    return this.form.get('neighborhood')!;
  }

  get city() {
    return this.form.get('city')!;
  }

  get uf() {
    return this.form.get('uf')!;
  }

  get deliveryType() {
    return this.form.get('deliveryType')!;
  }

  get cellphone1() {
    return this.form.get('cellphone1')!;
  }

  get cellphone2() {
    return this.form.get('cellphone2')!;
  }

  get telephone1() {
    return this.form.get('telephone1')!;
  }

  get telephone2() {
    return this.form.get('telephone2')!;
  }

  onSubmit(): void {
    if(!this.form.invalid){
      this.dialogRef.close(this.form.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

