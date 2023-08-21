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

  @Input() customerId?: number;
  @Input() data: Customer[];

  constructor(private _customerService: CustomerService){}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

  push(value: Customer): void {
    this._customerService.addDependent(value, this.customerId!)
      .subscribe({
        next: (customer: Customer) => this.data.push(customer)
      })
  }
}
