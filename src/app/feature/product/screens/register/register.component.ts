import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces/product';
// import { DialogOverviewAddChipComponent } from '../../components/dialogs/add-mat-chip/add-mat-chip.component';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  chipRemovable: boolean = false;
  private _productFC = new FormControl<Product>({} as Product);

  constructor(private _productService: ProductService) {}

  public saveProduct(): void {
    if(this._productFC.valid) {
      this._productService.save(this._productFC.value!)
        .subscribe({
          next: (value: Product) => this._productFC.reset()
        })
    }
  }

  get productFC() {
    return this._productFC
  }

}
