import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class SelectedTabService {

  private subjectCustomer = new Subject<Customer>();
  private subjectTableCustomers = new Subject<void>();

  constructor(){}

  getCustomerForDetails(): Subject<Customer> {
    return this.subjectCustomer;
  }

  changeToCustomerDetails(customer: Customer){
    this.subjectCustomer.next(customer);
  }

  getTableCustomersTab(): Subject<void> {
    return this.subjectTableCustomers;
  }

  changeToTableCustomers(){
    this.subjectTableCustomers.next();
  }
}
