import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { delay, first, Observable } from 'rxjs';
import { FullCustomer } from '../interfaces/full-customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/customer';
  private headers = { 'content-type': 'application/json'}

  existByCPF(cpf: string): Observable<boolean>{
    return this.http.get<boolean>(this.apiUrl + `/exist/${cpf}`);
  }

  findById(id: number): Observable<Customer>{
    return this.http.get<Customer>(this.apiUrl + `/${id}`, {'headers': this.headers});
  }

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + "/all")
      .pipe(
        first()
      );
  }

  create(customer: any): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl + '/create', customer, {'headers': this.headers});
  }

  deleteById(id: number): Observable<void>{
    return this.http.delete<void>(this.apiUrl + `/${id}`, {'headers': this.headers});
  }

  update(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(this.apiUrl, customer, {'headers': this.headers});
  }

  addDependent(dependent: Customer, customerId: number): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl + `/create/dependent/${customerId}`, dependent, {'headers': this.headers});
  }

  findAllDependentsById(customerId: number): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl + `/all/dependentsCustomers/${customerId}`, { headers: this.headers });
  }
  
}
