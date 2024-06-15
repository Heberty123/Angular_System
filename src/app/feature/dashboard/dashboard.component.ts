import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductDashboardComponent } from './screens/product-dashboard/product-dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomerDashboardComponent } from './screens/customer-dashboard/customer-dashboard.component';
import { PaymentDashboardComponent } from './screens/payment-dashboard/payment-dashboard.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ProductDashboardComponent,
    CustomerDashboardComponent,
    PaymentDashboardComponent,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {}
