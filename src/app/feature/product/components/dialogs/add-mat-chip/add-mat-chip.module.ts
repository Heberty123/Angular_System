import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOverviewAddChipComponent } from './add-mat-chip.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DialogOverviewAddChipComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
})
export class AddMatChipModule { }
