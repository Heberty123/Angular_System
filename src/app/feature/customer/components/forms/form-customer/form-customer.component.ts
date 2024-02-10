import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { existCPF } from 'src/app/shared/validations/exist-CPF';

interface CustomerForm {
  id: FormControl<number | null>,
  name: FormControl<String | null>,
  cpf: FormControl<String | null>,
}

@Component({
  selector: 'form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCustomerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormCustomerComponent),
      multi: true,
    }
  ],
})
export class FormCustomerComponent implements ControlValueAccessor, Validator, OnDestroy {
  destroySubject = new Subject<void>();
  private regexCPF: string = "^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$";

  constructor(private _service: CustomerService){}

  private _form = new FormGroup<CustomerForm>({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.regexCPF)],
      // asyncValidators: [existCPF(this._service, cpf.value)],
    })
  });
  
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._form.valid ? null : { customer: true };
  }

  get name() {
    return this.form.get('name')!;
  }

  get cpf(){
    return this.form.get('cpf')!;
  }

  get form(): FormGroup{
    return this._form;
  }

  writeValue(obj: Customer): void {
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
}
