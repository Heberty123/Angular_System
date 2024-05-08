import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Address } from '../interfaces/address';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private http:HttpClient) { }

  private apiUrl: string = 'api/address';
  private headers = { 'content-type': 'application/json'}

  save(address: any, customer: Customer): Observable<Address>{
    return this.http.post<Address>(this.apiUrl + `/create/${customer.id}`, address, {'headers': this.headers});
  }

  searchByCPF(cep: string): Observable<any>{
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`, { headers: this.headers });
  }

  findAllByCustomerId(id: number): Observable<Address[]>{
    return this.http.get<Address[]>(this.apiUrl + `/all/${id}`, { headers: this.headers });
  }

  update(address: Address): Observable<Address>{
    return this.http.put<Address>(this.apiUrl , address, {'headers': this.headers});
  }
  
  deleteById(id: number): Observable<unknown>{
    return this.http.delete(this.apiUrl + `/delete/${id}`, { observe: 'response', headers: this.headers })
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
