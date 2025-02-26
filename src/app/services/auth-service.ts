import { Injectable, signal } from '@angular/core';
import { User } from '../shared/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<User | undefined | null>(undefined);
  isAuthenticated(): boolean {
    return this.currentUserSig() != null && this.currentUserSig() != undefined;
  }
}
