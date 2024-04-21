import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/interfaces/customer';
import { PaymentService } from 'src/app/shared/resources/payment.service';
import { PaymentDetailComponent } from '../../../../shared/components/dialogs/payment-detail/payment-detail.component';
import { ObjToDisplayColumns } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Payment } from 'src/app/shared/interfaces/payment';

let snackBarRef: any;
let complexColumns: ObjToDisplayColumns[] = [
  { key: 'paymentType.name', label: 'Tipo de pagamento' },
  { key: 'payedAt', label: 'Pago em', pipe: { type: 'date' } },
  { key: 'amountPayed', label: 'Valor pago', pipe: { type: 'currency' } }
]

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
  displayedColumns: ObjToDisplayColumns[] = [
    { key: 'amount', label: 'Valor', pipe: { type: 'currency' } },
    { key: 'paymentDate', label: 'Data', pipe: { type: 'date' } }
  ]

  constructor(private _paymentService: PaymentService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // Primeiro pagamentos pendentes
    this._paymentService.findAllByCustomerId(this.customer.id!, false)
      .subscribe({
        next: (data: Payment[]) => this.data[0] = data
      })
  }

  bttnToggleChange(bttn: MatButtonToggleChange) {
    if (bttn.value === '0') 
      this.displayedColumns = this.displayedColumns.splice(0, 2);
    else {
      // Pagamentos já pagos
      this._pushMoreColumns();
      if (!this.data[1])
        this._paymentService.findAllByCustomerId(this.customer.id!, true)
          .subscribe({
            next: (data: Payment[]) => this.data[1] = data
      })
    }
  }

  rowClicked(payment: Payment) {
    const dialogRef = this.dialog.open(PaymentDetailComponent, {
      data: payment
    });

    dialogRef.afterClosed().subscribe({
      next: (result: Payment) => {
        if (result)
          this._payNow(result);
      }
    });
  }

  private _payNow(payment: Payment): void {
    this._paymentService.payNow(payment).subscribe({
      next: (dataUpdated: Payment) => {
        this.data[0]!.find((value, index) => {
            if (value.id! == dataUpdated.id!){
              let arr: Payment[] | undefined = this.data[0]!.splice(index, 1);
              console.log(this.data[0])
              this.data[0] = [...this.data[0]!];
              this.data[1]!.push(...arr);
              return;
            }
        })
      }
    })
  }

  private _pushMoreColumns(): void {
    this.displayedColumns.push(...complexColumns)
    this.displayedColumns = [...this.displayedColumns];
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }

}