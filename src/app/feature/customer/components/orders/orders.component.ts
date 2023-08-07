import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/shared/interfaces/order';
import { OrderDetailsComponent } from '../dialogs/order-details/order-details.component';

let snackBarRef: any;

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input() data: Order[]

  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['status', 'createdAt', 'grossAmount', 'netAmount'];
  @Output() rowClicked = new EventEmitter<Order>();

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Order>(this.data);
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
  }
  
  applyFilter(): void {
    //this.dataSource.filter = this.value!.trim().toLowerCase();
  }

  openOrder(order: Order): void {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: order
    });

    dialogRef.afterClosed().subscribe({
      next: (order: Order) => {
        if(order)
          console.log(order);
      }
    });
  }
  
}
