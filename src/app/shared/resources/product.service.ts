import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductForOrder } from '../interfaces/productForOrder';
import { Product } from '../interfaces/product';
import { SimpleProduct } from '../interfaces/simpleProduct';


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
    return this.http.post<Product>(this.apiUrl + "/", product, { headers: this.headers });
  }

  findByBarcode(value: string): Observable<Product>{
    return this.http.get<Product>(this.apiUrl + `/barcode/${value}`, { headers: this.headers })
  }
}