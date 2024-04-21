import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { BrandDashboard } from 'src/app/shared/interfaces/BrandDashboard';
import { ProductDashboard } from 'src/app/shared/interfaces/ProductDashboard';
import { BrandService } from 'src/app/shared/resources/brand.service';
import { ProductService } from 'src/app/shared/resources/product.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SalesData } from 'src/app/shared/interfaces/SalesData';
import moment, { Moment } from 'moment';
import { OrderService } from 'src/app/shared/resources/order.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ProductTypeService } from 'src/app/shared/resources/product-type.service';
import { ProductTypeDashboard } from 'src/app/shared/interfaces/ProductTypeDashboard';
import { InputYearComponent } from 'src/app/shared/components/inputs/input-year/input-year.component';



let productComplexColumns: ObjToDisplayColumns[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Nome' },
  { key: 'brand', label: 'Marca' },
  { key: 'value', label: 'Valor', pipe: { type: 'currency' } }
]

let productTypeComplexColumns: ObjToDisplayColumns[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Nome' },
  { key: 'value', label: 'Valor', pipe: { type: 'currency' } }
]

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

@Component({
  selector: 'product-dashboard',
  standalone: true,
  imports: [
    TableEntitiesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxChartsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    InputYearComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css',
})
export class ProductDashboardComponent implements OnInit {
  viewBar: [number, number];
  single: any[];
  sales: SalesData[];
  products: ProductDashboard[];
  productTypes: ProductTypeDashboard[];
  viewPie: [number, number];
  productDisplayColumns: ObjToDisplayColumns[] = productComplexColumns;
  productTypeDisplayColumns: ObjToDisplayColumns[] = productTypeComplexColumns;
  range = new FormGroup({
    start: new FormControl<Moment | null>(moment().startOf('month')),
    end: new FormControl<Moment | null>(moment().endOf('month')),
  });
  date = new FormControl(moment());

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  constructor(private _productService: ProductService,
    private _productTypeService: ProductTypeService,
    private _brandService: BrandService,
    private _orderService: OrderService,
    private _el:ElementRef) {
      this.viewBar = [this._el.nativeElement.width * 0.5 - 100, 500];
      this.viewPie = [this._el.nativeElement.width * 0.5 - 100, 400];
    }

  ngOnInit(): void {
    this._orderService.getSalesData().subscribe({
      next: (sales: SalesData[]) => this.sales = sales })
    this._productService.getDashboard().subscribe({ 
        next: (value: ProductDashboard[]) => this.products = value })
    this._productTypeService.getDashboard().subscribe({
      next: (value: ProductTypeDashboard[]) => this.productTypes = value })
    this._brandService.getDashboard().subscribe({
      next: (value: BrandDashboard[]) => this.single = value })
  }

  search(): void {
    let start: Moment | null = this.range.get('start')!.value!
    let end: Moment | null = this.range.get('end')!.value
    this._productService.getDashboard(start!, end!).subscribe({ 
      next: (value: ProductDashboard[]) => { this.products = value; console.log(value) } })
    this._brandService.getDashboard(start!, end!).subscribe({
      next: (value: BrandDashboard[]) => this.single = value })
    this._productTypeService.getDashboard(start!, end!).subscribe({
      next: (value: ProductTypeDashboard[]) => this.productTypes = value })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  
  chosenYearHandler(year: number) {
    this._orderService.getSalesData(year).subscribe({
      next: (sales: SalesData[]) => this.sales = sales })
  }

  onResize(event: any) {
    this.viewBar = [event.target.innerWidth * 0.5 - 100, 500];
    this.viewPie = [event.target.innerWidth * 0.5 - 100, 400];
  }

}
