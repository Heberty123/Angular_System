import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../dialogs/order-details/order-details.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { OrderService } from 'src/app/shared/resources/order.service';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MainLoadModule } from 'src/app/shared/components/loaders/main-load/main-load.module';
import { Order } from 'src/app/shared/classes/Order';
import { OrderInterface } from 'src/app/shared/interfaces/OrderInterface';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

let snackBarRef: any;
let columnsDisplayed: ObjToDisplayColumns[] = [
  { key: 'paid', label: 'Pago' },
  { key: 'createdAt', label: 'Data', pipe: { type: 'date' } },
  { key: 'grossAmount', label: 'Valor bruto', pipe: { type: 'currency' } },
  { key: 'netAmount', label: 'Valor líquido', pipe: { type: 'currency' } },
]

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [    
    CommonModule,
    MatButtonToggleModule,
    MainLoadModule,
    TableEntitiesComponent,
    MatIconModule,
    MatButtonModule
  ]
})
export class OrdersComponent implements OnInit {

  @Input() customer: Customer;
  // index 0 -> Orders unpaid
  // index 1 -> Orders paid
  data: [OrderInterface[]?, OrderInterface[]?] = [];
  displayColumns: ObjToDisplayColumns[]  = columnsDisplayed;
  constructor(private _orderService: OrderService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    // Orders Unpaid
    this._orderService.findAllByCustomerId(this.customer.id!, false)
      .subscribe({
        next: (data: OrderInterface[]) => {this.data[0] = data; console.log(data)}
      })
      console.log(this.data[0])
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
            next: (data: OrderInterface[]) => {this.data[1] = data} })
  }

  openOrder(order: OrderInterface): void {
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

  autorenew(group: MatButtonToggleGroup): void {
    this._orderService.findAllByCustomerId(this.customer.id!, false).subscribe({
      next: (unpaidOrders: OrderInterface[]) => this.data[0] = unpaidOrders })
    this.data[1] = undefined;
    group.value = "0";
  }

  ngOnDestroy(): void {
    snackBarRef && snackBarRef.dismiss();
  }
  
}
