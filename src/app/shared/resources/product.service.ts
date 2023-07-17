import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductForOrder } from '../interfaces/productForOrder';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/product';
  private headers = { 'content-type': 'application/json'}

  findAll(): Observable<ProductForOrder[]>{
    return this.http.get<ProductForOrder[]>(this.apiUrl + "/all", { headers: this.headers });
  }

  save(product: ProductForOrder): Observable<ProductForOrder>{
    return this.http.post<ProductForOrder>(this.apiUrl + "/", product, { headers: this.headers });
  }

  findByBarcode(value: string): Observable<ProductForOrder>{
    return this.http.get<ProductForOrder>(this.apiUrl + `/barcode/${value}`, { headers: this.headers })
  }
}
