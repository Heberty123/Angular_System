import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { existCPF } from 'src/app/shared/validations/exist-CPF';

@Component({
  selector: 'form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit{
  
  private regexCPF: string = "^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$";

  @Input() hasCustomer?: Customer;
  @Output('hasCustomerChange') emitter = new EventEmitter<Customer>();
  @Input() forDependents?: boolean;
  private customerForm: FormGroup;
  @Output() submited = new EventEmitter<Customer>();

  constructor(private _service: CustomerService){}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(this.hasCustomer?.name || null, [Validators.required]),
      cpf: new FormControl(this.hasCustomer?.cpf || null, {
        validators: [Validators.required, Validators.pattern(this.regexCPF)],
        asyncValidators: [existCPF(this._service, this.hasCustomer?.cpf)],
      })
    });

    if(this.hasCustomer){
      this.customerForm.valueChanges.subscribe({
        next: (value: Customer) => {
          value.id = this.hasCustomer!.id;
          this.emitter.emit(value);
        }
      })
    }
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

      if(this.hasCustomer){
        let customer: Customer = this.customerForm.value;
        customer.id = this.hasCustomer.id;
        this.submited.emit(customer);
      }
      else if(this.forDependents){
        this.submited.emit(this.customerForm.value);
        this.customerForm.reset();
      }
      else
        this.submited.emit(this.customerForm.value);
    }
  }

  @Input() set disabled$(value: boolean) {
    if(value)
      this.customerForm.disable();
    else{
      this.customerForm.enable();
      this.customerForm.reset();
    }
  }
}
