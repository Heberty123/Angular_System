import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerPayment } from '../interfaces/CustomerPaymentInterface';
import { SeriesDashboard } from '../interfaces/SeriesDashboard';
import moment from 'moment';
import { Payment } from '../interfaces/payment';

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

  getDashboard(year?: number): Observable<SeriesDashboard[]>{
    let params = new HttpParams();
    if(year) 
      params = params.append('year', year);
    else
      params = params.append('year', moment().year());
    
    return this.http.get<SeriesDashboard[]>(this.apiUrl + "/dashboard", { headers: this.headers,
    params: params })
  }
}

