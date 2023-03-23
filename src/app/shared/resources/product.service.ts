import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductType } from '../interfaces/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/product';
  private headers = { 'content-type': 'application/json'}

  save(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl + "/create", product, { headers: this.headers });
  }
}
