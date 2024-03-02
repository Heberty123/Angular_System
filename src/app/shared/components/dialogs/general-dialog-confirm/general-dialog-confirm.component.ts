import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface GeneralDialogData{
  title: string,
  description: string,
}

@Component({
  selector: 'general-dialog-confirm',
  standalone: true,
  imports: [
    MatCommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './general-dialog-confirm.component.html',
  styleUrl: './general-dialog-confirm.component.css'
})
export class GeneralDialogConfirmComponent {
  constructor(public dialogRef: MatDialogRef<GeneralDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GeneralDialogData) {}
}
