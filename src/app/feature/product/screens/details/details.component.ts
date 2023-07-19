import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'details-product',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() productId: number | null;
  choosenProduct: Product;
  @Output() eraseProduct: EventEmitter<void> = new EventEmitter<void>();
  @Output() toList: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _productService: ProductService){}

  ngOnInit(): void {
    if(this.productId)
      this._productService.findById(this.productId)
        .subscribe({
          next: (product: Product) => this.choosenProduct = product
        })
  }
}
