import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryType } from '../interfaces/delivery-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypeService {

  private apiUrl: string = 'api/deliveryType';
  private headers = { 'content-type': 'application/json'}

  constructor(private http:HttpClient) { }

  save(deliveryType: DeliveryType): Observable<DeliveryType>{
    return this.http.post<DeliveryType>(this.apiUrl + "/save", deliveryType, { headers: this.headers });
  }

  findAllDeliveryType(): Observable<DeliveryType[]>{
    return this.http.get<DeliveryType[]>(this.apiUrl + "/all/deliveryType", { headers: this.headers });
  }
}
