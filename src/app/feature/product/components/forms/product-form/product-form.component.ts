import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, FormGroupDirective, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgForm, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
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
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
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

class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl<any, any> | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
      return (control?.invalid && control.dirty) ?? false;
  }
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
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductFormComponent),
      multi: true,
    },
    {
      provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher
    }
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements ControlValueAccessor, Validator, OnInit,  OnDestroy {
  destroySubject = new Subject<void>();
  productTypes: ProductType[] = [];
  brands: Brand[] = [];
  chipRemovable: boolean = false;
  @Input() displaySubmit?: boolean = false;

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
  }

  private _form = new FormGroup<ProductForm>({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    reference: new FormControl(),
    barcode: new FormControl(),
    brand: new FormControl({} as Brand, [Validators.required]),
    productType: new FormControl({} as ProductType, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
    min_quantity: new FormControl(1, [Validators.required]),
    max_quantity: new FormControl(1, [Validators.required])
  });

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
  
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._form.valid ? null : { product: true };
  }

  compareBrandFn(one: Brand, two: Brand ): boolean {
    return one.id === two.id;
  }

  compareProductTypeFn(one: ProductType, two: ProductType ): boolean {
    console.log("Chamado")
    return one.id === two.id;
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
    return this._form;
  }

  writeValue(obj: Product): void {
    if(obj === null) {
      this._form.reset();
    } else {
      this._form
        .patchValue(obj, { emitEvent: false });
    } 
  }
  registerOnChange(fn: any): void {
    this._form.valueChanges
      .pipe(takeUntil(this.destroySubject))
      .subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this._form.valueChanges
    .pipe(takeUntil(this.destroySubject))
    .subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? 
      this._form.disable() :
      this._form.enable();
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
