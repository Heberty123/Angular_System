import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOverviewAddOptionComponent } from './add-mat-option-brand.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DialogOverviewAddOptionComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
})
export class AddMatOptionBrandModule { }
