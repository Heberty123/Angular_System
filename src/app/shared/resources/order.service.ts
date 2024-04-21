import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../classes/Order';
import { OrderInterface } from '../interfaces/OrderInterface';
import { SalesData } from '../interfaces/SalesData';
import moment from 'moment';
import { ProductOrder } from '../classes/ProductOrder';

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
    let orderAPI: string = this.stringify(order);
    return this.http.post<Order>(this.apiUrl + "/save", orderAPI, { headers: this.headers })
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
  }

  getSalesData(year?: number): Observable<SalesData[]>{
    let params = new HttpParams();
    if(year)
      params = params.append('year', year);
    else
      params = params.append('year', moment().year())
    return this.http.get<SalesData[]>(this.apiUrl + "/dashboard", { headers: this.headers,
    params: params })
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
