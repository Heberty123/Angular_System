import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { DeliveryType } from 'src/app/shared/interfaces/delivery-type';
import { AddressService } from 'src/app/shared/resources/address.service';
import { AddDeliveryTypeDialogComponent } from '../../dialogs/add-Delivery-type-dialog/add-delivery-type-dialog.component';
import { DeliveryTypeService } from 'src/app/shared/resources/delivery-type.service';

@Component({
  selector: 'form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit {

  //  For [(ngModel)]  
  @Input() hasAddress?: Address;
  @Output('hasAddressChange') emitter = new EventEmitter<Address>();
  //  Rest...
  private addressForm!: FormGroup;
  @Output() submited = new EventEmitter<Address>();
  deliveries: DeliveryType[] = [];

  constructor(private addressService: AddressService,
    private deliveryTypeService: DeliveryTypeService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.deliveryTypeService.findAllDeliveryType()
      .subscribe({
        next: (value: DeliveryType[]) => {
          this.deliveries = value;
        }
      });

    this.addressForm = new FormGroup({
      cep: new FormControl(this.hasAddress?.cep || ''),
      street: new FormControl(this.hasAddress?.street || '', [Validators.required]),
      number: new FormControl(this.hasAddress?.number || ''),
      neighborhood: new FormControl(this.hasAddress?.neighborhood || '', [Validators.required]),
      city: new FormControl(this.hasAddress?.city || '', [Validators.required]),
      uf: new FormControl(this.hasAddress?.uf || '', [Validators.required]),
      deliveryType: new FormControl(this.hasAddress?.deliveryType || '', [Validators.required]),
      cellphone1: new FormControl(this.hasAddress?.cellphone1 || ''),
      cellphone2: new FormControl(this.hasAddress?.cellphone2 || ''),
      telephone1: new FormControl(this.hasAddress?.telephone1 || ''),
      telephone2: new FormControl(this.hasAddress?.telephone2 || ''),
    });

    if(this.hasAddress){
      this.addressForm.valueChanges.subscribe({
        next: (value: Address) => {
          value.id = this.hasAddress!.id;
          this.emitter.emit(value);
        }
      })
    }
  }

  get street() {
    return this.addressForm.get('street')!;
  }

  get number() {
    return this.addressForm.get('number')!;
  }

  get neighborhood() {
    return this.addressForm.get('neighborhood')!;
  }

  get city() {
    return this.addressForm.get('city')!;
  }

  get uf() {
    return this.addressForm.get('uf')!;
  }

  get cep() {
    return this.addressForm.get('cep')!;
  }

  get deliveryType() {
    return this.addressForm.get('deliveryType')!;
  }

  get cellphone1() {
    return this.addressForm.get('cellphone1')!;
  }

  get cellphone2() {
    return this.addressForm.get('cellphone2')!;
  }

  get telephone1() {
    return this.addressForm.get('telephone1')!;
  }

  get telephone2() {
    return this.addressForm.get('telephone2')!;
  }

  get AddressForm(): FormGroup {
    return this.addressForm;
  }

  addDeliveryType(): void {
    const dialogRef = this.dialog.open(AddDeliveryTypeDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if (result) {
          this.deliveryTypeService.save({ name: result })
            .subscribe({
              next: (deliveryType: DeliveryType) => this.deliveries.push(deliveryType)
            })
        }
      }
    });
  }

  searchByCPF(): void {
    this.addressService.searchByCPF(this.cep.value)
      .subscribe(value => {
        this.street.setValue(value.logradouro),
          this.neighborhood.setValue(value.bairro),
          this.city.setValue(value.localidade),
          this.uf.setValue(value.uf)
      })
  }

  onSubmit(): void {
    if (!this.addressForm.invalid) {

      if (this.hasAddress) {
        let value = this.addressForm.value;
        value.id = this.hasAddress.id;
        this.submited.next(value);
        return
      }

      this.submited.next(this.addressForm.value);
    }
  }

  @Input() set disabled$(value: boolean) {
    if (value)
      this.addressForm.disable();
    else
      this.addressForm.enable();
  }
}
