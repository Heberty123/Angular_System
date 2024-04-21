import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ControlBarcodeReaderService } from './services/control-barcode-reader.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductByBarcodeComponent } from './shared/components/dialogs/product-by-barcode/product-by-barcode.component';
import { Product } from './shared/interfaces/product';
import { ProductService } from './shared/resources/product.service';
import { WebSocketStockService } from './shared/resources/web-socket-stock.service';
import { ProductStock } from './shared/interfaces/ProductStock';
import { InventoryStatusService } from './services/inventory-status.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Amelia_Angular';
  showFiller: boolean = false;
  opened: boolean;
  barcode: string = '';
  private subscription: Subscription;
  private isThereComponentBarcodeReader?: boolean;
  private lastKeypressTime = 0;
  private maxKeypressDelay = 100; 

  constructor(private controlBarcodeService: ControlBarcodeReaderService,
              public inventoryStatus: InventoryStatusService,
              private _productService: ProductService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription =
      this.controlBarcodeService.isThereComponentReader()
        .subscribe({
          next: (value: boolean) =>
            this.isThereComponentBarcodeReader = value
        });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }


  changeOpened(value: boolean): void {
    this.opened = value;
  }

  /** !!!!!! HostListeners  !!!!! */

  @HostListener("document:keyup.esc")
  onkeyup() {
    this.changeOpened(false);
  }

  @HostListener('window:keydown.control.m')
  onKeyDownControlM() {
    this.changeOpened(this.opened ? false : true);
  }

  @HostListener('window:keypress', ['$event'])
  handleBarcodeEvent(event: KeyboardEvent) {
    if (!(event.target instanceof HTMLInputElement)) {
      const now = new Date().getTime();

      // events must come fast enough to separate from manual input
      if (now - this.lastKeypressTime > this.maxKeypressDelay) 
        this.barcode = '';

      this.lastKeypressTime = now;

      if (event.key !== 'Enter') 
        this.barcode += event.key;
      else {
        if(this.barcode.length > 10){
          event.preventDefault();
          if (this.isThereComponentBarcodeReader) {
            this.controlBarcodeService.setBarcodeValue(this.barcode);
          }
          else {
            this.openProductByBarcode(this.barcode);
          }
        }
        this.barcode = '';
      }
    }
  }

  /** !!!!!! Dialogs  !!!!! */

  openProductByBarcode(barcode: string): void {
    this._productService.findByBarcode(barcode)
      .subscribe({
        next: (product: Product) => {
          const dialogRef = this.dialog.open(ProductByBarcodeComponent, {
            data: product
          });
        }
      });
  }

}
