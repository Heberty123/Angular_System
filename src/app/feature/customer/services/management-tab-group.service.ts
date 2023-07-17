import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class ManagementTabGroupService {

  private subject = new Subject<Customer | null>();

  constructor() { }

  getSubDetails(): Subject<Customer | null> {
    return this.subject;
  }

  setSubDetails(customer: Customer | null){
    this.subject.next(customer);
  }
}
