import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { existCPF } from 'src/app/shared/validations/exist-CPF';

@Component({
  selector: 'form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit, OnDestroy{
  
  private regexCPF: string = "^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$";

  @Input() haveCustomer?: Customer;
  @Input() toAddDependent?: boolean;
  private customerForm!: FormGroup;
  @Output() eventCustomer = new EventEmitter<Customer>();
  private subscription: Subscription;
  @Input() $formOpened: Observable<boolean>;
  @Input() $resetForm: Observable<void>;

  constructor(private _service: CustomerService){
    console.log(this.haveCustomer);
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(this.haveCustomer ? this.haveCustomer.name : '', [Validators.required]),
      cpf: new FormControl(this.haveCustomer ? this.haveCustomer.cpf : '', {
        validators: [Validators.required, Validators.pattern(this.regexCPF)],
        asyncValidators: [existCPF(this._service, this.haveCustomer?.cpf)],
      })
    });

    this.subscription = this.$formOpened.subscribe((value: boolean) => {
      if(value)
        this.customerForm.enable();
      else
        this.customerForm.disable();
    })

    this.subscription = this.$resetForm.subscribe(() => {
      this.customerForm.reset();
    })
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

      if(this.haveCustomer){
        let customer: Customer = this.customerForm.value;
        customer.id = this.haveCustomer.id;
        this.eventCustomer.emit(customer);
      }
      else if(this.toAddDependent){
        this.eventCustomer.emit(this.customerForm.value);
        this.customerForm.reset();
      }
      else
        this.eventCustomer.emit(this.customerForm.value);
    }

  }
}
