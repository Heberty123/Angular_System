import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { existCPF } from 'src/app/shared/validations/exist-CPF';
import { DisableComponentsService } from '../../../screens/register/services/disable-address.service';

@Component({
  selector: 'form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit, OnDestroy{
  
  private regexCPF: string = "^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$";

  valueName: string = '';
  private customerForm!: FormGroup;
  @Output() eventCustomer = new EventEmitter<Customer>();
  private subscription: Subscription;

  constructor(private _service: CustomerService,
      private disableComponents: DisableComponentsService){}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.regexCPF)],
        asyncValidators: [existCPF(this._service)],
      })
    });

    this.subscription = this.disableComponents.getCustomerDisabled()
      .subscribe(value => value ? this.CustomerForm.disable() : this.CustomerForm.enable());
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  get name() {
    return this.customerForm.get('name')!;
  }

  get cpf(){
    return this.customerForm.get('cpf')!;
  }

  get CustomerForm(): FormGroup{
    return this.customerForm;
  }

  onSubmit(){
    if(!this.customerForm.invalid && !this.customerForm.disabled){
      this.eventCustomer.emit(this.customerForm.value);
    }
  }
}
