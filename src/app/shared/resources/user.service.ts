import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  private headers = { 'content-type': 'application/json'}

  getUserByToken(): Observable<User>{
    return this.http.get<User>("users/token", { headers: this.headers })
  }
}
