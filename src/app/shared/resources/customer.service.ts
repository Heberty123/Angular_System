import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/customers';
  private headers = { 'content-type': 'application/json'}

  existByCPF(cpf: string): Observable<boolean>{
    return this.http.get<boolean>(this.apiUrl + `/${cpf}`);
  }

  findById(id: number): Observable<Customer>{
    return this.http.get<Customer>(this.apiUrl + `/${id}`, {'headers': this.headers});
  }

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl)
      .pipe(
        first()
      );
  }

  save(customer: any): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl, customer, {'headers': this.headers});
  }

  deleteById(id: number): Observable<void>{
    return this.http.delete<void>(this.apiUrl + `/${id}`, {'headers': this.headers});
  }

  deleteAllById(ids: number[]): Observable<void>{
    let obj = {"ids": ids}
    return this.http.patch<void>(this.apiUrl + "/deleteAllByIds", obj, { headers: this.headers });
  }

  update(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(this.apiUrl, customer, {'headers': this.headers});
  }

  addDependent(dependent: Customer, parent: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl + `/${parent.id!}/dependents`, dependent, {'headers': this.headers});
  }

  findAllDependentsByCustomer(customer: Customer): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl + `/${customer.id}/dependents`, { headers: this.headers });
  }
  
}
