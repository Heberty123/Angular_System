import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormAddressModule } from '../../forms/form-address/form-address.module';
import { Address } from 'src/app/shared/interfaces/address';

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
    FormAddressModule
  ]
})
export class EditAddressComponent {

  constructor(public dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address) { }
}
