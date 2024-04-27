import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GeneralDialogData, GeneralDialogConfirmComponent } from 'src/app/shared/components/dialogs/general-dialog-confirm/general-dialog-confirm.component';
import { Brand } from 'src/app/shared/interfaces/brand';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/interfaces/productType';
import { BrandService } from 'src/app/shared/resources/brand.service';
import { ProductTypeService } from 'src/app/shared/resources/product-type.service';
import { ProductService } from 'src/app/shared/resources/product.service';
import { AddBranchComponent } from '../../components/dialogs/add-branch/add-branch.component';
import { AddProductTypeComponent } from '../../components/dialogs/add-product-type/add-product-type.component';
import { ErrorStateMatcher } from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

interface ProductForm {
  id: FormControl<number | null>,
  name: FormControl<String | null>,
  description: FormControl<String | null>,
  reference: FormControl<String | null>,
  barcode: FormControl<String | null>,
  brand: FormControl<Brand | null>,
  productType: FormControl<ProductType | null>,
  price: FormControl<number | null>
  quantity: FormControl<number | null>
  min_quantity: FormControl<number | null>
  max_quantity: FormControl<number | null>
}

export class SelectErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  destroySubject = new Subject<void>();
  productTypes: ProductType[] = [];
  brands: Brand[] = [];
  chipRemovable: boolean = false;
  matcher = new SelectErrorStateMatcher();

  private _form = new FormGroup<ProductForm>({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    reference: new FormControl(),
    barcode: new FormControl(),
    brand: new FormControl(null, [Validators.required]),
    productType: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
    min_quantity: new FormControl(1, [Validators.required]),
    max_quantity: new FormControl(1, [Validators.required])
  });

  constructor(private _productService: ProductService,
    private _productTypeService: ProductTypeService,
    private _brandService: BrandService,
    private _dialog: MatDialog) {}

  ngOnInit(): void {
    this._productTypeService.findAll()
      .subscribe({
        next: (value: ProductType[]) => this.productTypes = value
      })
    this._brandService.findAll()
      .subscribe({
        next: (value: Brand[]) => this.brands = value
      })
  }

  public saveProduct(): void {
    console.log("Eu fui chamado em!")
    if(this._form.valid) {
      this._productService.save(this._form.value! as Product)
        .subscribe({
          next: (value: Product) => this._form.reset()
        })
    }
  }

  
  openDialogAddProductType(): void{
    const dialogRef = this._dialog.open(AddProductTypeComponent);
      dialogRef.afterClosed()
        .subscribe((newProductType: string) => {
          if (newProductType) {
            this._productTypeService.save({name: newProductType})
              .subscribe({
                next: (productType: ProductType) => {
                  this.productTypes.push(productType);
                }
              })
          }
        });
  }

  openDialogDeleteProductType(obj: ProductType): void {
    let information: GeneralDialogData = {
      title: `Deletar tipo produto ${obj.id}`,
      description: `Deseja deletar tipo de produto ${obj.name}?`
    }
    const dialogRef = this._dialog.open(GeneralDialogConfirmComponent, {
      data: information
    })
      dialogRef.afterClosed()
        .subscribe({
          next: (result: boolean) => {
            if(result) {
              this._productTypeService.delete(obj)
                .subscribe({
                  next: () => {
                    this.productTypes.find((value, index) => {
                      if(value.id === obj.id) {
                        this.productTypes.splice(index, 1);
                        return;
                      }
                    })
                  }
                })
            }
          }
        })
  }

  edit(value: ProductType, value2: any) {
    console.log(value, value2)
  }

  openDialogAddBrand(): void{
    const dialogRef = this._dialog.open(AddBranchComponent);
      dialogRef.afterClosed()
        .subscribe((newBrand: string) => {
          if (newBrand) {
            this._brandService.save({name: newBrand})
              .subscribe({
                next: (brand: Brand) => {
                  this.brands.push(brand);
                }
              })
          }
        });
  }

  // compareBrandFn(one: Brand, two?: Brand ): boolean {
  //   return one.id === two?.id;
  // }

  // compareProductTypeFn(one: ProductType, two?: ProductType ): boolean {
  //   return one.id === two?.id;
  // }

  get name() {
    return this.form.get('name')!;
  }

  get description(){
    return this.form.get('description')!;
  }

  get reference(){
    return this.form.get('reference')!;
  }

  get barcode(){
    return this.form.get('barcode')!;
  }

  get brand(): AbstractControl<any, any>{
    return this.form.get('brand')!;
  }

  get productType(){
    return this.form.get('productType')!;
  }

  get price(){
    return this.form.get('price')!;
  }

  get quantity(){
    return this.form.get('quantity')!;
  }

  get min_quantity(){
    return this.form.get('min_quantity')!;
  }

  get max_quantity(){
    return this.form.get('max_quantity')!;
  }

  get form(): FormGroup{
    return this._form;
  }

}
