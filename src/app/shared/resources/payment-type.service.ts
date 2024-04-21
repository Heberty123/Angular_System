import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentTypeDashboard } from '../interfaces/PaymentTypeDashboard';
import moment from 'moment';
import { PaymentType } from '../interfaces/paymentType';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/paymentTypes';
  private headers = { 'content-type': 'application/json'}

  findAll(): Observable<PaymentType[]>{
    return this.http.get<PaymentType[]>( this.apiUrl, { headers: this.headers })
  }

  getDashboard(startDate?: Date, endDate?: Date): Observable<PaymentTypeDashboard[]>{
    let params = new HttpParams();
    if(startDate && endDate) {
      params = params.append('startDate', startDate.toISOString());
      params = params.append('endDate', endDate.toISOString());
    }
    else {
      params = params.append('startDate', moment().startOf('month').toISOString());
      params = params.append('endDate', moment().endOf('month').toISOString());
    }
    return this.http.get<PaymentTypeDashboard[]>(this.apiUrl + "/dashboard",
     { headers: this.headers, params: params })
  }
}
