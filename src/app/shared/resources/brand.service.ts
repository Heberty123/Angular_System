import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand';
import { BrandDashboard } from '../interfaces/BrandDashboard';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/brand';
  private headers = { 'content-type': 'application/json'}

  findAll(): Observable<Brand[]>{
    return this.http.get<Brand[]>(this.apiUrl, {headers: this.headers});
  }

  save(brand: Brand): Observable<Brand>{
    return this.http.post<Brand>(this.apiUrl, brand, { headers: this.headers});
  }

  getDashboard(): Observable<BrandDashboard[]>{
    return this.http.get<BrandDashboard[]>(this.apiUrl + "/brandFinalValue", { headers: this.headers })
  }
}
