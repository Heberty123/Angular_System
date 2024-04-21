import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { InventoryComponent } from './screens/inventory/inventory.component';
import { ProductService } from 'src/app/shared/resources/product.service';
import { QuantifyProComponent } from './screens/quantify-pro/quantify-pro.component';
import { InventoryStatusService } from 'src/app/services/inventory-status.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-inventory-control',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    InventoryComponent,
    QuantifyProComponent,
    MatBadgeModule
  ],
  templateUrl: './inventory-control.component.html',
  styleUrl: './inventory-control.component.css'
})
export class InventoryControlComponent {

  selectedTabIndex: number;

  constructor(private _productService: ProductService,
    public inventoryStatus: InventoryStatusService,) {}

  
}
