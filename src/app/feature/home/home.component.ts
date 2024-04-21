import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  signal
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PaymentDetailComponent } from 'src/app/shared/components/dialogs/payment-detail/payment-detail.component';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { CustomerPayment } from 'src/app/shared/interfaces/CustomerPaymentInterface';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaymentService } from 'src/app/shared/resources/payment.service';

let objToDisplayColumns: ObjToDisplayColumns[] = [
  { key: 'amount', label: 'valor', pipe: { type: 'currency' } },
  { key: 'customer.name', label: 'nome' },
  { key: 'customer.cpf', label: 'cpf' }
]

@Component({
  selector: 'form-field-custom-control-example',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    TableEntitiesComponent
  ],
})
export class HomeComponent implements OnInit {

  private _paymentsToday: WritableSignal<CustomerPayment[]> = signal([]);
  displayColumns: ObjToDisplayColumns[] = objToDisplayColumns;

  constructor(private _paymentService: PaymentService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    this._paymentService.findAllToday()
      .subscribe({
        next: (value: CustomerPayment[]) => {
          this._paymentsToday.set(value);
        }
      })
  }

  public valueToday: Signal<number> = computed(() => {
    let value: number = 0;
    this._paymentsToday().forEach(p => value += p.amount);
    return value;
  })

  public paymentsToday: Signal<CustomerPayment[]> = computed(() => {
    return this._paymentsToday();
  })

  searchPayment(customerPayment: CustomerPayment): void {
    const dialogRef = this.dialog.open(PaymentDetailComponent, {
      data: customerPayment
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
        this._paymentsToday.update(cp =>
          cp.filter(v => v.id != dataUpdated.id!))
      }
    })
  }
}