import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DisableComponentsService {

  private formCustomer: boolean = false;
  private boxAddress: boolean = true;

  // Form Customer
  private customerDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.formCustomer);
  private disableCustomer$: Observable<boolean> = this.customerDisabled.asObservable();

  // Box Address
  private addressDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.boxAddress);
  private disableAddress$: Observable<boolean> = this.addressDisabled.asObservable();


  getCustomerDisabled(): Observable<boolean>{
    return this.disableCustomer$;
  }
  
  getAddressDisabled(): Observable<boolean>{
    return this.disableAddress$;
  }
  
  customerCreated(): void{
    this.customerDisabled.next(true);
    this.addressDisabled.next(false);
  }

}
