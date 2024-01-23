import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaymentService } from 'src/app/shared/resources/payment.service';
import { PaymentDetailComponent } from '../dialogs/payment-detail/payment-detail.component';

let snackBarRef: any;

@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input() customer: Customer;
  // index 0 -> payments unpaid;
  // index 1 -> payments paid;
  data: [Payment[]?, Payment[]?] = [];
  displayedColumns: string[] = ['amount', 'paymentDate'];

  constructor(private _paymentService: PaymentService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // Primeiro pagamentos pendentes
    this._paymentService.findAllByCustomerId(this.customer.id, false)
      .subscribe({
        next: (data: Payment[]) => this.data[0] = data,
        error: (error: HttpErrorResponse) => {
          if (error.status === 404)
            this.data[0] = [];
        }
      })
  }

  bttnToggleChange(bttn: MatButtonToggleChange) {
    if (bttn.value === '0')
      this.displayedColumns.splice(-3);
    else {
      // Pagamentos já pagos
      this.displayedColumns.push('paymentType', 'payedAt', 'amountPayed');
      if (!this.data[1])
        this._paymentService.findAllByCustomerId(this.customer.id, true)
          .subscribe({
            next: (data: Payment[]) => this.data[1] = data,
            error: (error: HttpErrorResponse) => {
              if (error.status === 404)
                this.data[1] = [];
            }
          })
    }
  }

  rowClicked(payment: Payment) {
    const dialogRef = this.dialog.open(PaymentDetailComponent, {
      data: payment
    });

    dialogRef.afterClosed().subscribe({
      next: (result: Payment) => {
        if (result && result.paid) {
          this._paymentService.payNow(result)
            .subscribe({
              next: (dataUpdated: Payment) => {
                this.data[0]!.find((value, index) => {
                    if (value.id === dataUpdated.id){
                      this.data[1]!.push(...this.data[0]!.splice(index, 1))
                      this.data[0] = [...this.data[0]!]
                      return;
                    }
                })
              }
            })
        }
      }
    });
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

}