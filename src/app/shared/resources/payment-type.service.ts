import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentType } from '../interfaces/PaymentType';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/paymentType';
  private headers = { 'content-type': 'application/json'}

  findAll(): Observable<PaymentType[]>{
    return this.http.get<PaymentType[]>( this.apiUrl, { headers: this.headers })
  }
}
