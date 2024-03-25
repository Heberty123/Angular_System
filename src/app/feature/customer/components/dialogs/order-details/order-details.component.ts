import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { OrderInterface } from 'src/app/shared/interfaces/OrderInterface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    TableEntitiesComponent
  ]
})
export class OrderDetailsComponent {

  displayColumns: ObjToDisplayColumns[] = [
    { key: 'product.name', label: 'Nome' },
    { key: 'netAmount', label: 'Valor líquido', pipe: { type: 'currency' } },
    { key: 'grossAmount', label: 'Valor bruto', pipe: { type: 'currency' } },
    { key: 'quantity', label: 'Quantitade' },
    { key: 'discounts', label: 'Descontos', pipe: { type: 'percent' } },
  ]
  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderInterface) { 
      console.log(data.productOrders)
    }


  ngOnInit(): void {}
}
