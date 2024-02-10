import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/shared/interfaces/address';
import { FormAddressComponent } from '../../forms/form-address/form-address.component';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormAddressComponent
  ]
})
export class EditAddressComponent {

  constructor(public dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address) { }
}