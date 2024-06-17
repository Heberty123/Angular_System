import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ProductType } from '../interfaces/productType';
import { ProductTypeDashboard } from '../interfaces/ProductTypeDashboard';
import moment, { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private _http: HttpClient) { }

  private apiUrl: string = 'api/productType';
  private headers = { 'content-type': 'application/json'}

  findAll(): Observable<ProductType[]>{
    return this._http.get<ProductType[]>(this.apiUrl + "/all", { headers: this.headers })
  }

  save(value: ProductType): Observable<ProductType>{
    return this._http.post<ProductType>(this.apiUrl, value, { headers: this.headers })
  }


  delete(value: ProductType): Observable<void>{
    return this._http.delete<void>(this.apiUrl + `/${value.id!}`, { headers: this.headers })
    .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)))
  }

  getDashboard(startDate?: Moment, endDate?: Moment): Observable<ProductTypeDashboard[]>{
    let params = new HttpParams();
    if(startDate && endDate) {
      params = params.append('startDate', startDate.toISOString());
      params = params.append('endDate', endDate.toISOString());
    }
    else {
      params = params.append('startDate', moment().startOf('month').toISOString());
      params = params.append('endDate', moment().endOf('month').toISOString());
    }

    return this._http.get<ProductTypeDashboard[]>(this.apiUrl + "/dashboard",
    { headers: this.headers, params: params })
  }
}
