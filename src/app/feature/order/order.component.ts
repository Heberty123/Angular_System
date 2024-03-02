import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ControlBarcodeReaderService } from 'src/app/services/control-barcode-reader.service';
import { Order } from 'src/app/shared/classes/Order';
import { ProductOrder } from 'src/app/shared/classes/ProductOrder';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { TableProductOrderComponent } from 'src/app/shared/components/tables/table-product-order/table-product-order.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Payment } from 'src/app/shared/interfaces/payment';
import { Product } from 'src/app/shared/interfaces/product';
import { OrderService } from 'src/app/shared/resources/order.service';
import { ProductService } from 'src/app/shared/resources/product.service';
import { ChooseCustomerDialogComponent } from './components/dialogs/choose-customer-dialog/choose-customer-dialog.component';
import { OrderSectionModule } from './components/order-section/order-section.module';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    OrderSectionModule,
    TableProductOrderComponent,
    TableEntitiesComponent,
    MatButtonModule
  ]
})
export class OrderComponent implements OnInit, OnDestroy {

  customerChoosed: Customer;
  // productForOrders: ProductForOrder[] = [];
  products: SimpleProduct[] = [];
  productOrders: ProductOrder[] = []
  payments: Payment[] = [];
  order: Order = new Order();
  private subscription: Subscription;

  constructor(private _productService: ProductService,
    private _orderService: OrderService,
    private dialog: MatDialog,
    private _controlBarcodeService: ControlBarcodeReaderService) {
    this._controlBarcodeService.setComponentReader(true);
  }

  ngOnInit(): void {
    this.subscription = this._controlBarcodeService.getBarcodeReaded()
      .subscribe({
        next: (barcodeText: string) => this.findByBarcode(barcodeText)
      })
    this._productService.findAll()
      .subscribe({ 
        next: (value: SimpleProduct[]) => this.products = value
      })
  }

  addProduct(product: Product): void {
    let productFound: ProductOrder | undefined =
    this.productOrders.find((obj) => obj.product.id === product.id);

    if (!productFound) {
        this.productOrders =
          [...this.productOrders, new ProductOrder(product)];
        return;
    }
    productFound.quantity!++
    this.updateChange();
  }

//   public productOrders: Signal<ProductOrder[]> = computed(() => {
//     this.updateValues();
//     return this._productOrders()
// })


// public updateValues(): void {
//   console.log("calculando preços")
//   this._productOrders().map((p) => {
//       let totalAmount = p.product.price * p.quantity;
//       if(!p.isRefund) {
//           this.grossAmount += totalAmount;
//           this.netAmount += totalAmount - (totalAmount * p.discounts)
//       }
//   });
//   this.discounts = 1 - (this.netAmount / this.grossAmount);
// }

  findByBarcode(barcodeText: string) {
    this._productService.findByBarcode(barcodeText)
      .subscribe({
        next: (product: Product) => {
          this.addProduct(product);
        }
      })
  }

  updateChange(): void {
    this.productOrders = [...this.productOrders];
  }

  deleteItems(items: ProductOrder[]): void {
    this.productOrders = this.productOrders
    .filter((item) => !items.includes(item));
  }


  saveOrder(): void {
    let order: Order = new Order()
    order.paid = false
    order.customerId = this.customerChoosed.id!
    
    // this._orderService.save(order)
    //   .subscribe({
    //     next: (value: Order) => console.log(value)
    //   })
    console.log(order);
  }

  produtoChamado(product: SimpleProduct) {
    this.addProduct(Object.assign(product));
  }


  openChooseCustomerDialog(): void {
    const dialogRef = this.dialog.open(ChooseCustomerDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (customer: Customer) => {
        if(customer){
          this.customerChoosed = customer
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._controlBarcodeService.setComponentReader(false);
    this.subscription && this.subscription.unsubscribe();
  }
}
