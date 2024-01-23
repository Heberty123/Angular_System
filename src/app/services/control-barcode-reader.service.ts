import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlBarcodeReaderService {

  private subjectNeedComponentToRead$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subjectBarcodeValue$: Subject<string> = new Subject<string>();

  constructor(){}

  // For subjectNeedComponentToRead$

  isThereComponentReader(): Observable<boolean> {
    return this.subjectNeedComponentToRead$.asObservable();
  }

  setComponentReader(value: boolean): void {
    this.subjectNeedComponentToRead$.next(value);
  }

  // For subjectBarcodeValue$

  getBarcodeReaded(): Observable<string> {
    return this.subjectBarcodeValue$.asObservable();
  }

  setBarcodeValue(value: string): void {
    this.subjectBarcodeValue$.next(value);
  }
}
