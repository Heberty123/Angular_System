import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private valor: boolean = true;
  testeApenas: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.valor);

  testeApenas$: Observable<boolean> = this.testeApenas.asObservable();

  getValor(): boolean{
    return this.valor;
  }
  
  setValor(valor: boolean): boolean{
    this.valor = valor;
    this.testeApenas.next(this.valor);
    return this.valor
  }
}
