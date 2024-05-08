import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';
import { EditProductComponent } from '../../components/dialogs/edit-product/edit-product.component';
import { GeneralDialogConfirmComponent, GeneralDialogData } from 'src/app/shared/components/dialogs/general-dialog-confirm/general-dialog-confirm.component';

@Component({
  selector: 'details-product',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() productId: number | undefined;
  choosenProduct: Product;
  @Output() toList: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _productService: ProductService,
    private _dialog: MatDialog){}

  ngOnInit(): void {
    if(this.productId)
      this._productService.findById(this.productId)
        .subscribe({
          next: (product: Product) => this.choosenProduct = product
        })
  }

  openDialogEditing(): void {
    const dialogRef = this._dialog.open(EditProductComponent, {
      data: this.choosenProduct
    })

    dialogRef.afterClosed().subscribe({
      next: (editedProduct: Product) => {
        if(editedProduct)
          this._productService.update(editedProduct)
            .subscribe({ next: (value: Product) => this.choosenProduct = value })
      }
    })
  }

  openDialogDeleting(): void {
    let information: GeneralDialogData = {
      title: `Produto ${this.choosenProduct.name}`,
      description: `Deseja mesmo remover produto id ${this.productId}?`
    }
    const dialogRef = this._dialog.open(GeneralDialogConfirmComponent, {
      data: information
    });

    dialogRef.afterClosed().subscribe({
      next: (confirm: boolean) => {
        if(confirm) {
          this._productService.delete(this.choosenProduct)
          .subscribe({ next: () => this.toList.emit() })
        }
      }
    })
  }
}
