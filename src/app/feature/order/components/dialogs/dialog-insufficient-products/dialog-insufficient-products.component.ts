import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { SimpleProductInterface } from 'src/app/shared/interfaces/SimpleProductInterface';

let columns: ObjToDisplayColumns[] = [
  {key: 'id', label: 'Id'},
  {key: 'name', label: 'Nome'},
  {key: 'price', label: 'Preço', pipe: { type: 'currency' }} 
];

@Component({
  selector: 'dialog-insufficient-products',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TableEntitiesComponent
  ],
  templateUrl: './dialog-insufficient-products.component.html',
  styleUrl: './dialog-insufficient-products.component.css'
})
export class DialogInsufficientProductsComponent {

  columnsDiplayed: ObjToDisplayColumns[] = columns;

  constructor(public dialogRef: MatDialogRef<DialogInsufficientProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SimpleProductInterface[]) {}

}
