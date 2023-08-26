import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.css']
})
export class TableOrderComponent {

  dataSource = new MatTableDataSource<Order>([]);
  displayedColumns: string[] = ['paid', 'createdAt', 'grossAmount', 'netAmount'];
  @Output() rowClicked = new EventEmitter<Order>();

  constructor(){}

  @Input() set data(data: Order[] | undefined) {
    if(data)
      this.dataSource.data = data;
  }
}
