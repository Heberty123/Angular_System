import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/Payment';
import { CustomerPayment } from '../interfaces/CustomerPaymentInterface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/payments';
  private headers = { 'content-type': 'application/json'}

  findAllToday(): Observable<CustomerPayment[]>{
    return this.http.get<CustomerPayment[]>(this.apiUrl + "/today", { headers: this.headers })
  }

  findAllByCustomerId(id: number, paid: boolean): Observable<Payment[]>{
    return this.http.get<Payment[]>(this.apiUrl + `/${id}/${paid}`, { headers: this.headers })
  }

  payNow(payment: Payment): Observable<Payment>{
    return this.http.post<Payment>(this.apiUrl + "/pay", payment, { headers: this.headers })
  }
}
