import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, take, throwError } from 'rxjs';
import { Address } from '../interfaces/address';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private http:HttpClient) { }

  private headers = { 'content-type': 'application/json'}

  save(address: any, customer_id: number): Observable<Address>{
    return this.http.post<Address>(`customers/${customer_id}/addresses`, address, {'headers': this.headers});
  }

  searchByCEP(cep: string): Observable<any>{
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`, { headers: this.headers });
  }

  findAllByCustomerId(id: number): Observable<Address[]>{
    return this.http.get<Address[]>(`api/customers/${id}/addresses`, { headers: this.headers })
    .pipe(delay(2000));
  }

  update(address: Address, customer_id: number): Observable<Address>{
    return this.http.put<Address>(`customers/${customer_id}/addresses/${address.id}` ,
      address, {'headers': this.headers});
  }
  
  delete(address: Address, customer_id: number): Observable<unknown>{
    return this.http.delete(`customers/${customer_id}/addresses/${address.id}`,
      { observe: 'response', headers: this.headers })
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
