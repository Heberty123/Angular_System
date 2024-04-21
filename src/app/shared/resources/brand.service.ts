import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand';
import { BrandDashboard } from '../interfaces/BrandDashboard';
import moment, { Moment } from 'moment';

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

  getDashboard(startDate?: Moment, endDate?: Moment): Observable<BrandDashboard[]>{
    let params = new HttpParams();
    if(startDate && endDate) {
      params = params.append('startDate', startDate.toISOString());
      params = params.append('endDate', endDate.toISOString());
    }
    else {
      params = params.append('startDate', moment().startOf('month').toISOString());
      params = params.append('endDate', moment().endOf('month').toISOString());
    }
    return this.http.get<BrandDashboard[]>(this.apiUrl + "/brandFinalValue",
     { headers: this.headers, params: params })
  }
}
