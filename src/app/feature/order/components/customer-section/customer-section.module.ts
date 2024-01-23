import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSectionComponent } from './customer-section.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CustomerSectionComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    CustomerSectionComponent
  ]
})
export class CustomerSectionModule { }
