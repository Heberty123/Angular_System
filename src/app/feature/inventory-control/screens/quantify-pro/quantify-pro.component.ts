import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ControlBarcodeReaderService } from 'src/app/services/control-barcode-reader.service';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';
import { ProductListComponent } from '../../dialogs/product-list/product-list.component';
import { ProductStockEdit } from 'src/app/shared/interfaces/ProductStockEdit';

let columnsToDisplay: ObjToDisplayColumns[] = [
  {key: 'id', label: 'Id'},
  {key: 'name', label: 'Nome'},
  {key: 'reference', label: 'Reference'},
  {key: 'quantity', label: 'Quantidade', editable: true},
  {key: 'min_quantity', label: 'mín'},
  {key: 'max_quantity', label: 'máx'}
];

@Component({
  selector: 'quantify-pro',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    TableEntitiesComponent
  ],
  templateUrl: './quantify-pro.component.html',
  styleUrl: './quantify-pro.component.css'
})
export class QuantifyProComponent implements OnInit, OnDestroy {

  productStocks: Product[] = [];
  columnDisplayed: ObjToDisplayColumns[] = columnsToDisplay;
  private subscription: Subscription;

  constructor(private _controlBarcodeService: ControlBarcodeReaderService,
    private _productService: ProductService,
    private _dialog: MatDialog) {
    this._controlBarcodeService.setComponentReader(true);
  }

  ngOnInit(): void {
    this.subscription = this._controlBarcodeService.getBarcodeReaded()
      .subscribe({
        next: (barcodeText: string) => this.findByBarcode(barcodeText)
      })
  }

  findByBarcode(barcodeText: string) {
    this._productService.findByBarcode(barcodeText)
      .subscribe({ next: (product: Product) => this.addProduct(product) })
  }

  findById(id: number): void {
    this._productService.findById(id).subscribe({
      next: (value: Product) => this.addProduct(value)})
  }

  addProduct(obj: Product): void {
    let found: Product | undefined = this.productStocks.find((p: Product) => p.id == obj.id);
    if(found) {
      found.quantity++;
      return;
    }
    this.productStocks = [...this.productStocks, obj];
  }

  save(): void {
    let updating: ProductStockEdit[] = [];
    this.productStocks.forEach((p: Product) => updating.push({id: p.id, quantity: p.quantity}));
    this._productService.updateAllStocks(updating).subscribe({
      next: () => console
    })
  }

  openDialog(): void {
    let dialog = this._dialog.open(ProductListComponent, {
      width: "50%",
      height: "70%",
      maxHeight: "600px",
      minHeight: "600px"
    });
    dialog.afterClosed().subscribe({
      next: (value: SimpleProduct) => this.findById(value.id) })
  }

  ngOnDestroy(): void {
    this._controlBarcodeService.setComponentReader(false);
    this.subscription && this.subscription.unsubscribe();
  }
}
