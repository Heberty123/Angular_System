import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DeliveryType } from 'src/app/shared/interfaces/delivery-type';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { AddressService } from 'src/app/shared/resources/address.service';
import { DeliveryTypeService } from 'src/app/shared/resources/delivery-type.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDeliveryTypeDialogComponent } from '../../dialogs/add-delivery-type-dialog/add-delivery-type-dialog.component';
import { provideNgxMask } from 'ngx-mask';

 interface AddressForm {
  id?: FormControl <number | null>,
  street: FormControl <string | null>,
  number: FormControl <number | null>,
  neighborhood: FormControl <string | null>,
  city: FormControl <string | null>,
  uf: FormControl <string | null>,
  cep: FormControl <string | null>,
  deliveryType: FormControl <DeliveryType | null>,
  cellphone1: FormControl <string | null>,
  cellphone2: FormControl <string | null>,
  telephone1: FormControl <string | null>,
  telephone2: FormControl <string | null>,
}


@Component({
  selector: 'form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsBasics, 
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormAddressComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormAddressComponent),
      multi: true,
    }
  ],
})
export class FormAddressComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {

  @Input() enableButton: boolean = true;
  @Output() submit = new EventEmitter<void>();
  destroySubject = new Subject<void>();
  deliveries: DeliveryType[] = [];

  private regexCEP: RegExp = /^\d{5}-\d{3}$/;

  constructor(private _addressService: AddressService,
    private _deliveryTypeService: DeliveryTypeService,
    public dialog: MatDialog){}

    ngOnInit(): void {
      this._deliveryTypeService.findAllDeliveryType()
        .subscribe({
          next: (value: DeliveryType[]) => {
            this.deliveries = value;
          }
        });
    }

    private _form = new FormGroup<AddressForm>({
      id: new FormControl(null),
      cep: new FormControl('', {validators: [Validators.pattern(this.regexCEP)] }),
      street: new FormControl('', [Validators.required]),
      number: new FormControl(null),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      deliveryType: new FormControl({} as DeliveryType, [Validators.required]),
      cellphone1: new FormControl(''),
      cellphone2: new FormControl(''),
      telephone1: new FormControl(''),
      telephone2: new FormControl(''),
    });

    

    findByCEP(): void {
      this._addressService.searchByCPF(this.cep.value!)
        .subscribe(value => {
          this.street.setValue(value.logradouro),
          this.neighborhood.setValue(value.bairro),
          this.city.setValue(value.localidade),
          this.uf.setValue(value.uf)
        })
    }

    addDeliveryType(): void {
      const dialogRef = this.dialog.open(AddDeliveryTypeDialogComponent);
      dialogRef.afterClosed().subscribe({
        next: (value: string) => {
          this._deliveryTypeService.save({name: value})
            .subscribe({
              next: (deliveryType: DeliveryType) => 
                this.deliveries.push(deliveryType)
            })
        }
      })
    }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._form.valid ? null : { customer: true };
  }

  writeValue(obj: any): void {
    if(obj === null) {
      this._form.reset();
    } else {
      this._form
      .patchValue(obj, { emitEvent: false});
    }
  }
  registerOnChange(fn: any): void {
    this._form.valueChanges
      .pipe(takeUntil(this.destroySubject))
      .subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this._form.valueChanges
    .pipe(takeUntil(this.destroySubject))
    .subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? 
    this._form.disable() :
    this._form.enable();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  // Getters

  isEditable(): boolean {
    console.log()
    return this._form.get('id')?.value ? true : false
  }

  get cep(): AbstractControl<string | null> {
    return this._form.get('cep')!;
  }

  get street(): AbstractControl<string | null>{
    return this._form.get('street')!;
  }

  get number(): AbstractControl<number | null>{
    return this._form.get('number')!;
  }

  get neighborhood(): AbstractControl<string | null>{
    return this._form.get('neighborhood')!;
  }

  get city(): AbstractControl<string | null>{
    return this._form.get('city')!;
  }

  get uf(): AbstractControl<string | null>{
    return this._form.get('uf')!;
  }

  get deliveryType(): AbstractControl<DeliveryType | null>{
    return this._form.get('deliveryType')!;
  }

  get cellphone1(): AbstractControl<string | null>{
    return this._form.get('cellphone1')!;
  }

  get cellphone2(): AbstractControl<string | null>{
    return this._form.get('cellphone2')!;
  }

  get telephone1(): AbstractControl<string | null>{
    return this._form.get('telephone1')!;
  }

  get telephone2(): AbstractControl<string | null>{
    return this._form.get('telephone2')!;
  }

  get form(): FormGroup{
    return this._form;
  }
}
