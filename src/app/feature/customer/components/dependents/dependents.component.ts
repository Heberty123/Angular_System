import { Component, Input } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';

let snackBarRef: any;

@Component({
  selector: 'dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css']
})
export class DependentsComponent {

  @Input() customer: Customer;
  dependents: Customer[] = [];

  constructor(private _customerService: CustomerService){}

  ngOnInit(): void {
    this._customerService.findAllDependentsById(this.customer.id)
      .subscribe({
        next: (data: Customer[]) => this.dependents = data
      })
  }

  ngOnDestroy(): void {
    //snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

  push(value: Customer): void {
    this._customerService.addDependent(value, this.customer.id)
      .subscribe({
        next: (customer: Customer) => this.dependents.push(customer)
      })
  }
}
