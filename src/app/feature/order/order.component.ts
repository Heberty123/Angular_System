import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { TableProductModule } from 'src/app/shared/components/tables/table-product/table-product.module';
import { ProductOrder } from 'src/app/shared/interfaces/productOrder';
import { OrderSectionModule } from './components/order-section/order-section.module';
import { TableOrderModule } from './components/tables/table-order/table-order.module';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';
import { Subscription } from 'rxjs';
import { ControlBarcodeReaderService } from 'src/app/services/control-barcode-reader.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    TableProductModule,
    OrderSectionModule,
    TableOrderModule
  ]
})
export class OrderComponent implements OnInit, OnDestroy {

  products: ProductOrder[] = [];
  private subscription: Subscription;

  constructor(private productService: ProductService,
              private controlBarcodeService: ControlBarcodeReaderService){
    this.controlBarcodeService.setComponentReader(true);
  }

  ngOnInit(): void {
    this.subscription = this.controlBarcodeService.getBarcodeReaded()
      .subscribe({
        next: (barcodeText: string) => this.findByBarcode(barcodeText)
      }) 
  }

  addProduct(product: Product): void {
    let rowOrder: ProductOrder = {
      id: product.id,
      name: product.name,
      barcode: product.barcode,
      brand: product.brand,
      description: product.description,
      price: product.price,
      productType: product.productType,
      reference: product.reference,
      quantity: 1
    };

    if(!this.products.some((obj) => obj.id === rowOrder.id)){
      this.products = [...this.products, rowOrder];
    }
    else{
      this.products.find(item => item.id === rowOrder.id)!.quantity++;
      this.products = [...this.products];
    }      
  }

  findByBarcode(barcodeText: string){
    this.productService.findByBarcode(barcodeText)
      .subscribe({
        next: (product: Product) => {
          this.addProduct(product);
        }
      })
  }

  updateItem(item: ProductOrder): void{
    this.products.find((value) => {
      if(value.id === item.id)
        value.quantity = item.quantity;
    })
    console.log(this.products);
  }

  deleteItems(items: ProductOrder[]): void{
    this.products = this.products.filter((item) => !items.includes(item));
  }

  ngOnDestroy(): void {
    console.log("O component foi destruído !!!!!");
    this.controlBarcodeService.setComponentReader(false);
    this.subscription.unsubscribe();
  }
}
