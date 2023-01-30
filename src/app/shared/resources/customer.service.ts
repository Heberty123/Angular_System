import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';

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

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + "/all");
  }

  create(customer: any): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl + '/create', customer, {'headers': this.headers});
  }
  
}
