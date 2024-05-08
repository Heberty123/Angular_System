import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subject, takeUntil } from 'rxjs';
import { Brand } from 'src/app/shared/interfaces/brand';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductType } from 'src/app/shared/interfaces/productType';
import { BrandService } from 'src/app/shared/resources/brand.service';
import { ProductTypeService } from 'src/app/shared/resources/product-type.service';
import { AddBranchComponent } from '../../dialogs/add-branch/add-branch.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AddProductTypeComponent } from '../../dialogs/add-product-type/add-product-type.component';
import { GeneralDialogConfirmComponent, GeneralDialogData } from 'src/app/shared/components/dialogs/general-dialog-confirm/general-dialog-confirm.component';
import { MatChipsModule } from '@angular/material/chips';

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


@Component({
  selector: 'product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit,  OnDestroy {
  destroySubject = new Subject<void>();
  productTypes: ProductType[] = [];
  brands: Brand[] = [];
  chipRemovable: boolean = false;
  @Input() displaySubmit?: boolean = false;
  @Input() formGroup: FormGroup

  constructor(private _productTypeService: ProductTypeService,
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

      this.formGroup.addControl('id', new FormControl(null))
      this.formGroup.addControl('name', new FormControl('', [Validators.required]))
      this.formGroup.addControl('description', new FormControl())
      this.formGroup.addControl('reference', new FormControl(null))
      this.formGroup.addControl('barcode', new FormControl(null))
      this.formGroup.addControl('brand', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('productType', new FormControl(null, [Validators.required]))

      this.formGroup.addControl('price', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('quantity', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('min_quantity', new FormControl(null, [Validators.required]))
      this.formGroup.addControl('max_quantity', new FormControl(null, [Validators.required]))
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
  

  compareBrandFn(one: Brand, two?: Brand ): boolean {
    return one.id === two?.id;
  }

  compareProductTypeFn(one: ProductType, two?: ProductType ): boolean {
    return one.id === two?.id;
  }

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

  get brand(){
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
    return this.formGroup;
  }

  onSubmit(): void {
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
