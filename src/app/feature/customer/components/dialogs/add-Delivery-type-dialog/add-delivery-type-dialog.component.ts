import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'add-delivery-type-dialog',
  templateUrl: './add-delivery-type-dialog.component.html',
  styleUrls: ['./add-delivery-type-dialog.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ]
})
export class AddDeliveryTypeDialogComponent {

  data: string;
  constructor(public dialogRef: MatDialogRef<AddDeliveryTypeDialogComponent>
  ) {}

  onNoClick(): void{
    this.dialogRef.close();
  }
}
