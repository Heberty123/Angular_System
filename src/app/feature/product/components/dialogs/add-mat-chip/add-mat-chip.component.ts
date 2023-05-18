import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'dialog-overview-add-mat-chip',
  templateUrl: 'dialog-overview-add-chip.html',
  styleUrls: []
})
export class DialogOverviewAddChipComponent {
  
  data: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewAddChipComponent>
  ) {}

  onNoClick(): void{
    this.dialogRef.close();
  }
}