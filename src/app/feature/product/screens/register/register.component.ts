import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/shared/interfaces/productType';
import { ProductTypeService } from 'src/app/shared/resources/product-type.service';
import { DialogOverviewAddChipComponent } from '../../components/dialogs/add-mat-chip/add-mat-chip.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/shared/interfaces/brand';
import { BrandService } from 'src/app/shared/resources/brand.service';
import { ProductService } from 'src/app/shared/resources/product.service';
import { DialogOverviewAddOptionComponent } from '../../components/dialogs/add-mat-option-brand/add-mat-option-brand.component';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  productTypes: ProductType[] = [];
  private productForm!: FormGroup;
  brands: Brand[] = [];
  chipRemovable: boolean = false;

  constructor(
    private productTypeService: ProductTypeService,
    private brandService: BrandService,
    private productService: ProductService,
    private dialog: MatDialog){
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        reference: new FormControl(''),
        barcode: new FormControl(''),
        brand: new FormControl(''),
        price: new FormControl('', [Validators.required]),
      });
    }

    ngOnInit(): void {
      this.productTypeService.findAll()
        .subscribe({
          next: (value: ProductType[]) => this.productTypes = value
        });
      this.brandService.findAll()
        .subscribe({
          next: (value: Brand[]) => { this.brands = value }
        });
    }


    get name() {
      return this.productForm.get('name')!;
    }
  
    get description(){
      return this.productForm.get('description')!;
    }
  
    get reference(){
      return this.productForm.get('reference')!;
    }
  
    get barcode(){
      return this.productForm.get('barcode')!;
    }
  
    get brand(){
      return this.productForm.get('brand')!;
    }
  
    get price(){
      return this.productForm.get('price')!;
    }
  
    get productType(){
      return this.productForm.get('productType')!;
    }
  
    get ProductForm(): FormGroup{
      return this.productForm;
    }




  addChip(): void {
    const dialogRef = this.dialog.open(DialogOverviewAddChipComponent);
      dialogRef.afterClosed().subscribe((newProductType: string) => {
        if (newProductType) {
          this.productTypeService.create({name: newProductType})
            .subscribe({
              next: (productType: ProductType) => this.productTypes.push(productType)
            })
        }
      });
  }

  removeChip(obj: ProductType): void{
    this.productTypeService.delete(obj)
      .subscribe({
        next: () => {       
          this.productTypes.filter((value, index) => {
            if(value.id! === obj.id!){
              this.productTypes.splice(index, 1);
            }
          })
        }
      })
  }

  editChip(obj: ProductType): void{
    console.log(obj)
  }


  addBrand(value: string): void{
    this.brandService.save({ name: value })
      .subscribe({
        next: (brand: Brand) => {
          this.brands.push(brand)
        }
      })
  }

  openDialogAddBrand(): void{
    const dialogRef = this.dialog.open(DialogOverviewAddOptionComponent);
      dialogRef.afterClosed().subscribe((newBrand: string) => {
        if (newBrand) {
          this.brandService.save({name: newBrand})
            .subscribe({
              next: (brand: Brand) => this.brands.push(brand)
            })
        }
      });
  }

  onSubmit(): void{
    if(!this.productForm.invalid){
      this.productService.save(this.productForm.value)
        .subscribe({
          next: (value: Product) => {
            this.productForm.reset();
            this.productForm.clearValidators();
          }
        })
    }
  }

}
