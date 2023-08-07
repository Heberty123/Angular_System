import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/shared/interfaces/payment';

@Component({
  selector: 'table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.css']
})
export class TablePaymentComponent implements OnInit, OnChanges {

  @Input() payments: Payment[];
  @Input() editable?: boolean;
  displayedColumns: string[] = ['amount', 'grossAmount', 'paymentType', 'options'];
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource<Payment>([]);

  constructor(){}

  ngOnInit(): void {
    this.dataSource.data = this.payments;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payments'])
      this.dataSource.data = this.payments;
  }

  rowClicked(row: Payment): void {
    console.log(row);
  }
}
