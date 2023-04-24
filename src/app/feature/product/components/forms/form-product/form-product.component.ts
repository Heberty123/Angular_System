import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { Brand } from 'src/app/shared/interfaces/brand';
import { ProductType } from 'src/app/shared/interfaces/productType';
import { Product } from 'src/app/shared/interfaces/product';
import { BrandService } from 'src/app/shared/resources/brand.service';
import { ProductService } from 'src/app/shared/resources/product.service';
import { ProductTypeService } from 'src/app/shared/resources/product-type.service';

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  
  private productForm!: FormGroup;
  brands: Brand[] = [];
  productTypes: ProductType[] = [];
  chipValue: string
  chipRemovable: boolean = false;

  constructor(private brandService: BrandService,
    private productService: ProductService,
    private productTypeService: ProductTypeService){
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        reference: new FormControl(''),
        barcode: new FormControl(''),
        brand: new FormControl(''),
        price: new FormControl('', [Validators.required]),
        productType: new FormControl('')
      });
  }

  ngOnInit(): void {
    this.brandService.findAll()
      .subscribe({
        next: (value: Brand[]) => { this.brands = value }
      });
    this.productTypeService.findAll()
      .subscribe({
        next: (value: ProductType[]) => { this.productTypes = value }
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

  addNewChip(value: string): void{
    let obj: ProductType = { 
      id: undefined,
      name: value
    };
    this.productTypeService.create(obj)
      .subscribe({
        next: (value: ProductType) => {
          this.productTypes.push(value)
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

  chipChange(chipEvent: MatChipListboxChange): void{
    let value: string = this.name.value;
    this.chipValue = chipEvent.value;
  }

  onSubmit(): void{
    if(!this.productForm.invalid){
      this.productService.save(this.productForm.value)
        .subscribe({
          next: (value: Product) => {
            console.log('o valor foi persistido no banco de dados: ');
            console.log(value);
            this.productForm.reset();
            this.productForm.clearValidators();
          }
        })
    }
  }
}
