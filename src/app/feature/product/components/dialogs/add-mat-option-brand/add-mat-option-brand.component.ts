import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-overview-add-option',
  templateUrl: './dialog-overview-add-option.html',
  styleUrls: []
})
export class DialogOverviewAddOptionComponent {
  
  data: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewAddOptionComponent>
  ) {}

  onNoClick(): void{
    this.dialogRef.close();
  }
}
