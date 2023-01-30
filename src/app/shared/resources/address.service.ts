import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Address } from '../interfaces/address';
import { DeliveryType } from '../interfaces/delivery-type';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  disable$: any;

  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/address';
  private headers = { 'content-type': 'application/json'}

  create(address: any, customerId: number): Observable<Address>{
    return this.http.post<Address>(this.apiUrl + `/create/${customerId}`, address, {'headers': this.headers});
  }

  
  searchByCPF(cep: string): Observable<any>{
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  findAllDeliveryType(): Observable<DeliveryType[]>{
    return this.http.get<any>(this.apiUrl + "/all/deliveryType");
  }
  
  deleteById(id: number): Observable<unknown>{
    return this.http.delete(this.apiUrl + `/delete/${id}`, {observe: 'response'})
      .pipe(
        take(1),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
