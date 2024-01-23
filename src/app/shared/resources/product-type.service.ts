import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../interfaces/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/productType';
  private headers = { 'content-type': 'application/json'}

  findAll(): Observable<ProductType[]>{
    return this.http.get<ProductType[]>(this.apiUrl + "/all", { headers: this.headers })
  }

  create(value: ProductType): Observable<ProductType>{
    return this.http.post<ProductType>(this.apiUrl + "/", value, { headers: this.headers })
  }

  delete(value: ProductType): Observable<void>{
    return this.http.delete<void>(this.apiUrl + `/${value.id!}`, { headers: this.headers })
  }
}
