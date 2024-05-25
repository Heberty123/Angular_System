import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
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
import { Product } from 'src/app/shared/interfaces/product';
import { OrderService } from 'src/app/shared/resources/order.service';
import { ProductService } from 'src/app/shared/resources/product.service';
import { ChooseCustomerDialogComponent } from './components/dialogs/choose-customer-dialog/choose-customer-dialog.component';
import { PaymentMethodComponent } from './components/dialogs/payment-method/payment-method.component';
import { OrderSectionModule } from './components/order-section/order-section.module';
import { SimpleProductInterface } from 'src/app/shared/interfaces/SimpleProductInterface';
import { DialogInsufficientProductsComponent } from './components/dialogs/dialog-insufficient-products/dialog-insufficient-products.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrderSavedComponent } from './components/snackbar/order-saved/order-saved.component';

let snackBarRef: any;

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
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class OrderComponent implements OnInit, OnDestroy {

  customerChoosed: Customer | undefined;
  order: Order = new Order();
  private subscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _productService: ProductService,
    private _orderService: OrderService,
    private dialog: MatDialog,
    private _controlBarcodeService: ControlBarcodeReaderService,
    private _snackBar: MatSnackBar) {
    this._controlBarcodeService.setComponentReader(true);
    
  }

  ngOnInit(): void {
    this.subscription = this._controlBarcodeService.getBarcodeReaded()
      .subscribe({
        next: (barcodeText: string) => this.findByBarcode(barcodeText)
      })
  }

  addProduct(product: Product): void {
    this.order.addProductOrders(product);
  }

  addSelectedProducts(products: SimpleProduct[]): void {
    products.forEach(p => this.produtoChamado(p))
  }

  deleteItems(items: ProductOrder[]): void {
    this.order.deleteProductOrders(items)
  }

  findByBarcode(barcodeText: string) {
    this._productService.findByBarcode(barcodeText)
      .subscribe({
        next: (product: Product) => {
          this.addProduct(product);
        }
      })
  }

  saveOrder(): void {
    this._productService.validInventory(this.order.productOrders).subscribe({
      next: () => this.paymentMethodDialog(),
      error: (value: any) => this.openInsufficienteProductDialog(value.error.products) 
    })
  }

  produtoChamado(product: SimpleProduct) {
    this.addProduct(Object.assign(product));
  }

  openChooseCustomerDialog(): void {
    const dialogRef = this.dialog.open(ChooseCustomerDialogComponent, {
      width: "50%",
      height: "65%",
      maxWidth: "800px",
      maxHeight: "800px"
    });

    dialogRef.afterClosed().subscribe({
      next: (customer: Customer) => {
        if(customer){
          this.customerChoosed = customer;
          this.order.customerId = customer.id!
        }
      }
    });
  }

  paymentMethodDialog(): void {
    const dialogRef = this.dialog.open(PaymentMethodComponent, {
      data: this.order, width: '80%', height: '80%', maxWidth: '1000px',
      maxHeight: '700px'
    });
    
    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if(result) {
          this.definitelySave();
        }
      }
    })
  }

  private definitelySave(): void {
    this._orderService.save(this.order)
      .subscribe({
        next: (value: Order) => this.requestPersistedSuccessfully(),
        error: (value: any) => this.openInsufficienteProductDialog(value.error.products) 
      })    
  }

  private requestPersistedSuccessfully(): void {
    this.openSnackBar()
    this.customerChoosed = undefined
    this.order = new Order()
  }

  private openSnackBar() {
    snackBarRef = this._snackBar.openFromComponent(OrderSavedComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  openInsufficienteProductDialog(products: SimpleProductInterface[]): void {
    this.dialog.open(DialogInsufficientProductsComponent, {
      data: products, width: '80%', height: '80%',
      maxWidth: '1000px',maxHeight: '700px',
    });
  }

  ngOnDestroy(): void {
    this._controlBarcodeService.setComponentReader(false);
    this.subscription && this.subscription.unsubscribe();
    this._snackBar && this._snackBar.dismiss();
  }
}
