import { Injectable } from '@angular/core';
import { ProductStock } from '../shared/interfaces/ProductStock';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { WebSocketStockService } from '../shared/resources/web-socket-stock.service';
import { ProductService } from '../shared/resources/product.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryStatusService {

  private stocks$: BehaviorSubject<ProductStock[]> = new BehaviorSubject<ProductStock[]>([]);

  constructor(private _webSocketStockService: WebSocketStockService,
    private _productService: ProductService){
      this._productService.getAllStockStatus().subscribe({
        next: (value: ProductStock[]) => { this.addStatus(value) },
        complete: () => this._webSocketStockService.listen((news: ProductStock[]) => {this.addStatus(news); console.log(news)} )
      })
  }

  getStockStatus(): Observable<ProductStock[]> {
    return this.stocks$.asObservable();
  }

  get qtyStatus(): number | null {
    return this.stocks$.value.length || null;
  }

  private addStatus(products: ProductStock[]) {
    this.stocks$.next(products);
    console.log(this.stocks$.value);
  }
}
