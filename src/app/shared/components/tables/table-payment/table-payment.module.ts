import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaymentComponent } from './table-payment.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';



@NgModule({
  declarations: [
    TablePaymentComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule, 
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsBasics
  ],
  exports: [
    TablePaymentComponent
  ]
})
export class TablePaymentModule { }
