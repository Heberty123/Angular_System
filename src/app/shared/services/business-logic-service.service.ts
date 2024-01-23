import { Injectable } from '@angular/core';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicServiceService {

  constructor() { }


  //To update each according to value weight !
  updateInstallments(payments: Payment[], value: number, index: number): void {

    let totalAmount: number = payments.reduce((total, item) => total + item.amount, 0) 

    let percentage: number = (value/totalAmount) - (payments[index].amount / totalAmount);

    payments[index].amount = value;
    let piece_percentage = percentage / (payments.length - 1);

    payments.forEach((v, i) => {

      if(i !== index){
        v.amount = totalAmount * ((v.amount / totalAmount) - piece_percentage);
      }
    })

  }
}
