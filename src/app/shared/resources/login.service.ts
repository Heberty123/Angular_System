import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../interfaces/user-login';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  private headers = { 'content-type': 'application/json'}

  login(data: UserLogin): Observable<User>{
    return this.http.post<User>("api/login", data, { headers: this.headers })
  }
}
