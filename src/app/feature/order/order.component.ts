import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { TableProductModule } from 'src/app/shared/components/tables/table-product/table-product.module';
import { OrderSectionModule } from './components/order-section/order-section.module';
import { TableOrderModule } from './components/table-order/table-order.module';
import { ProductService } from 'src/app/shared/resources/product.service';
import { Subscription } from 'rxjs';
import { ControlBarcodeReaderService } from 'src/app/services/control-barcode-reader.service';
import { CustomerSectionModule } from './components/customer-section/customer-section.module';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Order } from 'src/app/shared/interfaces/order';
import { ProductOrderPost } from 'src/app/shared/interfaces/productOrderPost';
import { OrderService } from 'src/app/shared/resources/order.service';
import { ProductForOrder } from 'src/app/shared/interfaces/productForOrder';
import { Product } from 'src/app/shared/interfaces/product';
import { OrderDetails } from 'src/app/shared/interfaces/orderDetails';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TableProductModule,
    OrderSectionModule,
    CustomerSectionModule,
    TableOrderModule,
    TableProductModule
  ]
})
export class OrderComponent implements OnInit, OnDestroy {

  customerChoosed: Customer;
  products: ProductForOrder[] = [];
  orderDetails: OrderDetails;
  private subscription: Subscription;

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private controlBarcodeService: ControlBarcodeReaderService) {
    this.controlBarcodeService.setComponentReader(true);
    this.orderDetails = {
      grossAmount: 0,
      netAmount: 0,
      quantity: 0,
      qtyRefund: 0,
      returnValue: 0,
      discounts: 0
    }
  }

  ngOnInit(): void {
    this.subscription = this.controlBarcodeService.getBarcodeReaded()
      .subscribe({
        next: (barcodeText: string) => this.findByBarcode(barcodeText)
      })
  }

  customerSelected(customer: Customer): void {
    this.customerChoosed = customer;
  }

  addProduct(product: ProductForOrder): void {
    product.quantity = 1;

    if (!this.products.some((obj) => obj.id === product.id)) {
      product.grossAmount = product.price * product.quantity;
      product.netAmount = product.grossAmount;
      this.products = [...this.products, product];
      this.updateDetails();
    }
    else {
      let productFound: ProductForOrder =
        this.products.find(item => item.id === product.id)!;
      productFound.quantity!++

      this.changeQuantity(productFound);
    }
  }

  findByBarcode(barcodeText: string) {
    this.productService.findByBarcode(barcodeText)
      .subscribe({
        next: (product: ProductForOrder) => {
          this.addProduct(product);
        }
      })
  }

  updateList(): void {
    this.products = [...this.products];
    this.updateDetails();
  }

  changeQuantity(product: ProductForOrder): void {
    product.grossAmount =
      product.price * product.quantity;

    product.netAmount =
      product.grossAmount - (
        product.grossAmount * product.discounts
      )
    this.updateList();
  }

  deleteItems(items: ProductForOrder[]): void {
    this.products = this.products.filter((item) => !items.includes(item));
    this.updateDetails();
  }

  updateDetails(): void {
    this.orderDetails.grossAmount = 0;
    this.orderDetails.netAmount = 0;
    this.orderDetails.quantity = 0;
    this.orderDetails.qtyRefund = 0;
    this.orderDetails.returnValue = 0;
    let totalAmount: number;
    this.products?.forEach(p => {
      totalAmount = p.price * p.quantity;
      if (p.isRefund) {
        this.orderDetails.returnValue += totalAmount;
        this.orderDetails.qtyRefund += p.quantity
      }
      else {
        this.orderDetails.grossAmount += totalAmount
        this.orderDetails.netAmount += totalAmount - (totalAmount * p.discounts)
        this.orderDetails.quantity += p.quantity!
      }
    })
    this.orderDetails.discounts = 1 - (this.orderDetails.netAmount / this.orderDetails.grossAmount);
  }

  saveOrder(): void {
    let order: Order = {
      status: "pending",
      customerId: this.customerChoosed.id,
      grossAmount: this.orderDetails.grossAmount,
      netAmount: this.orderDetails.netAmount,
      discounts: this.orderDetails.discounts,
      productsOrders: this.products.map((value) => {
        let productOrder: ProductOrderPost = {
          productId: value.id,
          quantity: value.quantity,
          discounts: value.discounts,
          isRefund: value.isRefund
        }
        return productOrder;
      })
    }

    this.orderService.save(order)
      .subscribe({
        next: (value: Order) => console.log(value)
      })
  }


  produtoChamado(product: Product) {
    let productOrder: ProductForOrder = {
      id: product.id,
      barcode: product.barcode,
      brand: product.brand,
      description: product.description,
      discounts: 0,
      isRefund: false,
      name: product.name,
      price: product.price,
      productType: product.productType,
      quantity: 1,
      reference: product.reference,
      grossAmount: 0,
      netAmount: 0,
      promotion: 0
    }
    this.addProduct(productOrder);
  }


  ngOnDestroy(): void {
    this.controlBarcodeService.setComponentReader(false);
    this.subscription && this.subscription.unsubscribe();
  }
}
