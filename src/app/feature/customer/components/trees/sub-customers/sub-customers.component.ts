import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Customer } from "src/app/shared/interfaces/customer";
import { CustomerService } from "src/app/shared/resources/customer.service";

let snackBarRef: any;

@Component({
  selector: 'sub-customers',
  templateUrl: './sub-customers.component.html',
  styleUrls: ['./sub-customers.component.css']
})
export class SubCustomersComponent implements OnInit, OnDestroy {
  @Input() customerId?: number;
  @Input() data: Customer[];

  constructor(private _customerService: CustomerService){}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

  push(value: Customer): void {
    this._customerService.addDependent(value, this.customerId!)
      .subscribe({
        next: (customer: Customer) => this.data.push(customer)
      })
  }
}
