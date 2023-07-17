import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/order';
  private headers = { 'content-type': 'application/json'}

  save(order: Order): Observable<Order>{
    return this.http.post<Order>(this.apiUrl + "/save", order, { headers: this.headers })
  }
}
