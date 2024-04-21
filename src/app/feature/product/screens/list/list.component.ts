import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';
import { ObjToDisplayColumns } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { ProductService } from 'src/app/shared/resources/product.service';

let columnToDisplay: ObjToDisplayColumns[] = [
  {key: "id", label: "Id"},
  {key: "name", label: "Nome"},
  {key: "price", label: "Preço", pipe: { type: "currency" }}
]

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: SimpleProduct[] = [];
  columnsDiplayed = columnToDisplay;
  @Output() rowClicked: EventEmitter<SimpleProduct> = new EventEmitter<SimpleProduct>();

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.findAll().subscribe({
      next: (value: SimpleProduct[]) => this.products = value })
  }
}
