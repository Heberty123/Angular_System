import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductDashboard } from 'src/app/shared/interfaces/ProductDashboard';
import { ProductService } from 'src/app/shared/resources/product.service';
import { BrandService } from 'src/app/shared/resources/brand.service';
import { BrandDashboard } from 'src/app/shared/interfaces/BrandDashboard';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';

let complexColumns: ObjToDisplayColumns[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Nome' },
  { key: 'brand', label: 'Marca' },
  { key: 'value', label: 'Valor', pipe: { type: 'currency' } }
]

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    CommonModule,
    TableEntitiesComponent,
    NgxChartsModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  single: any[];
  products: ProductDashboard[];
  view: [number, number] = [500, 500];
  displayColumns: ObjToDisplayColumns[] = complexColumns;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _productService: ProductService,
    private _brandService: BrandService) {
  //  Object.assign(this, { single });
  }

  ngOnInit(): void {
    this._productService.getDashboard().subscribe({ 
      next: (value: ProductDashboard[]) => this.products = value })
    this._brandService.getDashboard().subscribe({
      next: (value: BrandDashboard[]) => this.single = value })
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
}
