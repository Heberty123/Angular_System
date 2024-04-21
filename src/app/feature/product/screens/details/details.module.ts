import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    DetailsComponent
  ]
})
export class DetailsModule { }
