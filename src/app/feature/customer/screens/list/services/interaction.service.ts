import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private valueChangedSubject = new Subject<string>();

  constructor(){}

  getValueChanged(): Subject<string> {
    return this.valueChangedSubject
  }

  sendValueChanged(value: string){
    this.valueChangedSubject.next(value);
  }
}
