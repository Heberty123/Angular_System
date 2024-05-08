import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DeliveryType } from 'src/app/shared/interfaces/delivery-type';
import { AddressService } from 'src/app/shared/resources/address.service';
import { DeliveryTypeService } from 'src/app/shared/resources/delivery-type.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideNgxMask } from 'ngx-mask';
import { AddDeliveryTypeDialogComponent } from '../../dialogs/add-delivery-type-dialog/add-delivery-type-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { ErrorStateMatcher } from '@angular/material/core';

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
    provideNgxMask()
  ],
})
export class formAddressComponent implements OnInit, OnDestroy {

  @Input() enableButton: boolean = true;
  @Input() formGroup: FormGroup;
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

      this.formGroup.addControl('id', new FormControl(null))
      this.formGroup.addControl('cep', new FormControl(null, [Validators.pattern(this.regexCEP)]))
      this.formGroup.addControl('street', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('number', new FormControl(null))
      this.formGroup.addControl('neighborhood', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('city', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('uf', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('deliveryType', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('cellphone1', new FormControl(null))
      this.formGroup.addControl('cellphone2', new FormControl(null))
      this.formGroup.addControl('telephone1', new FormControl(null))
      this.formGroup.addControl('telephone2', new FormControl(null))
    }

    findByCEP(): void {
      this._addressService.searchByCPF(this.cep?.value!)
        .subscribe(value => {
          this.street?.setValue(value.logradouro),
          this.neighborhood?.setValue(value.bairro),
          this.city?.setValue(value.localidade),
          this.uf?.setValue(value.uf)
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

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  isEditable(): boolean {
    console.log()
    return this.formGroup?.get('id')?.value ? true : false
  }

  compareDTFn(one: DeliveryType, two?: DeliveryType ): boolean {
    return one.id === two?.id;
  }

    // Getters

  get cep(): AbstractControl<any, any> | null {
    return this.formGroup?.get('cep');
  }

  get street() {
    return this.formGroup?.get('street');
  }

  get number() {
    return this.formGroup?.get('number');
  }

  get neighborhood() {
    return this.formGroup?.get('neighborhood');
  }

  get city() {
    return this.formGroup?.get('city');
  }

  get uf() {
    return this.formGroup?.get('uf');
  }

  get deliveryType() {
    return this.formGroup?.get('deliveryType');
  }

  get cellphone1() {
    return this.formGroup?.get('cellphone1');
  }

  get cellphone2() {
    return this.formGroup?.get('cellphone2');
  }

  get telephone1() {
    return this.formGroup?.get('telephone1');
  }

  get telephone2() {
    return this.formGroup?.get('telephone2');
  }
}
