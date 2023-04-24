import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from './form-product.component';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { MatChipsModule } from '@angular/material/chips';
import { AddMatChipModule } from '../../dialogs/add-mat-chip/add-mat-chip.module';


@NgModule({
  declarations: [
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormsBasics,
    MatChipsModule,
    AddMatChipModule
  ],
  exports: [
    FormProductComponent
  ]
})
export class FormProductModule { }
