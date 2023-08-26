import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/payment';
  private headers = { 'content-type': 'application/json'}

  findAllByCustomerId(id: number, paid: boolean): Observable<Payment[]>{
    return this.http.get<Payment[]>( this.apiUrl + `/${id}/${paid}`, { headers: this.headers })
  }
}
