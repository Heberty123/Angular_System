import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'btt-add-chip',
  templateUrl: './add-mat-chip.component.html',
  styleUrls: ['./add-mat-chip.component.css']
})
export class AddMatChipComponent {

  @Output() messageEvent = new EventEmitter<string>();
  constructor(public dialog: MatDialog){}

  addChip(): void{
    const dialogRef = this.dialog.open(DialogOverviewAddChipComponent);

    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if(result){
          this.messageEvent.emit(result);
        }
      }
    });  
  }
}


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