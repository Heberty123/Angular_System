import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address';
import { Customer } from 'src/app/shared/interfaces/customer';
import { DeliveryType } from 'src/app/shared/interfaces/delivery-type';
import { AddressService } from 'src/app/shared/resources/address.service';

@Component({
  selector: 'form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit, OnDestroy {
  
  private addressForm!: FormGroup;
  @Input() customer?: Customer;
  @Output() messageEvent = new EventEmitter<Address>();
  deliveries?: DeliveryType[];
  private subscription: Subscription;
  @Input() addressEmit: Observable<void>;
  @Input() keepOpen?: boolean;

  constructor(private addressService: AddressService){
      this.addressForm = new FormGroup({
      cep: new FormControl(''),
      street: new FormControl('', [Validators.required]),
      number: new FormControl(''),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      deliveryType: new FormControl('', [Validators.required]),
      cellphone1: new FormControl(''),
      cellphone2: new FormControl(''),
      telephone1: new FormControl(''),
      telephone2: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.addressService.findAllDeliveryType()
      .subscribe({
        next: (value: DeliveryType[]) => {
          this.deliveries = value;
        }
      });

    if(!this.keepOpen)
      this.addressForm.disable();

    this.subscription = this.addressEmit.subscribe(() => {
      this.addressForm.enable();
    })
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  get street() {
    return this.addressForm.get('street')!;
  }

  get number(){
    return this.addressForm.get('number')!;
  }

  get neighborhood(){
    return this.addressForm.get('neighborhood')!;
  }

  get city(){
    return this.addressForm.get('city')!;
  }

  get uf(){
    return this.addressForm.get('uf')!;
  }

  get cep(){
    return this.addressForm.get('cep')!;
  }

  get deliveryType(){
    return this.addressForm.get('deliveryType')!;
  }

  get cellphone1(){
    return this.addressForm.get('cellphone1')!;
  }

  get cellphone2(){
    return this.addressForm.get('cellphone2')!;
  }

  get telephone1(){
    return this.addressForm.get('telephone1')!;
  }

  get telephone2(){
    return this.addressForm.get('telephone2')!;
  }

  get AddressForm(): FormGroup{
    return this.addressForm;
  }

  searchByCPF(): void{
    this.addressService.searchByCPF(this.cep.value)
      .subscribe(value => {
        this.street.setValue(value.logradouro),
        this.neighborhood.setValue(value.bairro),
        this.city.setValue(value.localidade),
        this.uf.setValue(value.uf)
      })
  }

  onSubmit(): void{
    if(!this.addressForm.invalid){
      this.messageEvent.next(this.addressForm.value);
    }
  }
}
