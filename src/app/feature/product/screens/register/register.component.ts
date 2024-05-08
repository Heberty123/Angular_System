import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/resources/product.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  chipRemovable: boolean = false;
  private _productFG = new FormGroup({});

  constructor(private _productService: ProductService) {}

  public saveProduct(): void {

    if(this._productFG.valid) {
      this._productService.save(this._productFG.value! as Product)
        .subscribe({
          next: () => this._productFG.reset()
        })
    }
  }

  get productFG(): FormGroup {
    return this._productFG
  }

}
