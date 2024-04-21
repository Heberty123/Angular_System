import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PaymentTypeDashboard } from 'src/app/shared/interfaces/PaymentTypeDashboard';
import { SeriesDashboard } from 'src/app/shared/interfaces/SeriesDashboard';
import { PaymentTypeService } from 'src/app/shared/resources/payment-type.service';
import { PaymentService } from 'src/app/shared/resources/payment.service';

@Component({
  selector: 'payment-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './payment-dashboard.component.html',
  styleUrl: './payment-dashboard.component.css'
})
export class PaymentDashboardComponent {

  singlePie: any[];
  multiLine: SeriesDashboard[];
  viewPie: [number, number] = [700, 500];
  viewLine: [number, number] = [700, 500]

  constructor(private _paymentService: PaymentService,
    private _paymentTypeService: PaymentTypeService) {
    this._paymentTypeService.getDashboard().subscribe({
      next: (value: PaymentTypeDashboard[]) => { this.singlePie = value; console.log(value) } })
    this._paymentService.getDashboard().subscribe({
      next: (value: SeriesDashboard[]) => { this.multiLine = value; console.log(value) } })
  }

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  /*onResize(event: any) {
    this.viewBar = [event.target.innerWidth * 0.5 - 100, 500];
    this.viewPie = [event.target.innerWidth * 0.5 - 100, 400];
  }*/

/*  constructor(private _productService: ProductService,
    private _productTypeService: ProductTypeService,
    private _brandService: BrandService,
    private _orderService: OrderService,
    private _el:ElementRef) {
      this.viewBar = [this._el.nativeElement.width * 0.5 - 100, 500];
      this.viewPie = [this._el.nativeElement.width * 0.5 - 100, 400];
    }*/
}
