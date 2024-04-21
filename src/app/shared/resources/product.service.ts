import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { SimpleProduct } from '../classes/SimpleProduct';
import { ProductDashboard } from '../interfaces/ProductDashboard';
import moment, { Moment } from 'moment';
import { Order } from '../classes/Order';
import { ProductOrder } from '../classes/ProductOrder';
import { ProductStock } from '../interfaces/ProductStock';
import { ProductStockEdit } from '../interfaces/ProductStockEdit';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/product';
  private headers = { 'content-type': 'application/json'}

  findById(id: number): Observable<Product>{
    return this.http.get<Product>(this.apiUrl + `/${id}`, { headers: this.headers })
  }

  findAll(): Observable<SimpleProduct[]>{
    return this.http.get<SimpleProduct[]>(this.apiUrl + "/all", { headers: this.headers });
  }

  save(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product, { headers: this.headers });
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(this.apiUrl, product, { headers: this.headers });
  }

  findByBarcode(value: string): Observable<Product>{
    return this.http.get<Product>(this.apiUrl + `/barcode/${value}`, { headers: this.headers })
  }
  
  validInventory(products: ProductOrder[]) {
    let productOrders: string = this.stringify(products);
    return this.http.post<void>(this.apiUrl + "/valid-inventory", productOrders, { headers: this.headers })
    .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
  }

  getAllStockStatus(): Observable<ProductStock[]> {
    return this.http.get<ProductStock[]>(this.apiUrl + "/stock-status", { headers: this.headers })
  }

  updateAllStocks(objs: ProductStockEdit[]): Observable<void> {
    return this.http.patch<void>(this.apiUrl + "/stocks", objs, { headers: this.headers })
  }

  getDashboard(startDate?: Moment, endDate?: Moment): Observable<ProductDashboard[]>{
    let params = new HttpParams();
    if(startDate && endDate) {
      params = params.append('startDate', startDate.toISOString());
      params = params.append('endDate', endDate.toISOString());
    }
    else {
      params = params.append('startDate', moment().startOf('month').toISOString());
      params = params.append('endDate', moment().endOf('month').toISOString());
    }

    return this.http.get<ProductDashboard[]>(this.apiUrl + "/productFinalValue",
     { headers: this.headers, params: params })
  }

  delete(obj: Product): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/${obj.id}`, { headers: this.headers })
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
