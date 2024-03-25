import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../classes/Order';
import { OrderInterface } from '../interfaces/OrderInterface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/order';
  private headers = { 'content-type': 'application/json'}

  findAllByCustomerId(id: number, paid: boolean): Observable<OrderInterface[]>{
    return this.http.get<OrderInterface[]>(this.apiUrl + `/customer/${id}/${paid}`, { headers: this.headers })
  }

  save(order: Order): Observable<Order>{
    let orderAPI: any = this.stringify(order);
    return this.http.post<Order>(this.apiUrl + "/save", orderAPI, { headers: this.headers })
  }

  private stringify(obj: any): string {
    let cache: any[] | null = [];
    let str = JSON.stringify(obj, function(key, value) {
      key = "testekkkkkk";
      if (typeof value === "object" && value !== null) {
        if (cache?.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // reset the cache
    return str;
  }
}
