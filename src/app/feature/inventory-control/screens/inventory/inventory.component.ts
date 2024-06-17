import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InventoryStatusService } from 'src/app/services/inventory-status.service';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { ProductStock } from 'src/app/shared/interfaces/ProductStock';

let columnsToDisplay: ObjToDisplayColumns[] = [
  {key: 'id', label: 'Id'},
  {key: 'name', label: 'Nome'},
  {key: 'status', label: 'Status'},
  {key: 'quantity', label: 'Quantidade'},
  {key: 'min_quantity', label: 'Quantidade mínima'},
  {key: 'max_quantity', label: 'Quantidade máxima'}
];

@Component({
  selector: 'inventory',
  standalone: true,
  imports: [
    CommonModule,
    TableEntitiesComponent
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  inventoryStatus: ProductStock[] = [];
  columnsDisplayed: ObjToDisplayColumns[] = columnsToDisplay;

  constructor(private _inventoryStatus: InventoryStatusService) {
    this._inventoryStatus.getStockStatus().subscribe({
      next: (value: ProductStock[]) => { this.inventoryStatus = value; } })
  }
}
