import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../dialogs/order-details/order-details.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { OrderService } from 'src/app/shared/resources/order.service';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainLoadModule } from 'src/app/shared/components/loaders/main-load/main-load.module';
import { TableOrderModule } from 'src/app/shared/components/tables/table-order/table-order.module';
import { Order } from 'src/app/shared/classes/Order';

let snackBarRef: any;

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [    
    CommonModule,
    TableOrderModule,
    MatButtonToggleModule,
    MainLoadModule
  ]
})
export class OrdersComponent implements OnInit {

  @Input() customer: Customer;
  // index 0 -> Orders unpaid
  // index 1 -> Orders paid
  data: [Order[]?, Order[]?] = [];

  constructor(private _orderService: OrderService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    // Orders Unpaid
    this._orderService.findAllByCustomerId(this.customer.id!, false)
      .subscribe({
        next: (data: Order[]) => this.data[0] = data,
        error: (error: HttpErrorResponse) => this.data[0] = []
      })
  }
  
  applyFilter(): void {
    //this.dataSource.filter = this.value!.trim().toLowerCase();
  }

  bttnToggleChange(bttn: MatButtonToggleChange){
    // Orders paid
    if(bttn.value === '1')
      if(!this.data[1])
        this._orderService.findAllByCustomerId(this.customer.id!, true)
          .subscribe({ 
            next: (data: Order[]) => this.data[1] = data,
            error: (error: HttpErrorResponse) => {
              if (error.status === 404)
                this.data[1] = [];
            }
          })
    
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
    console.log("Fui destruído")
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
