import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from './form-product.component';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { MatChipsModule } from '@angular/material/chips';
import { AddMatChipModule } from '../../dialogs/add-mat-chip/add-mat-chip.module';
import { AddMatOptionBrandModule } from '../../dialogs/add-mat-option-brand/add-mat-option-brand.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';



@NgModule({
  declarations: [
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormsBasics,
    MatChipsModule,
    AddMatChipModule,
    AddMatOptionBrandModule,
    MatDialogModule,
    AdvanceChipListboxComponent
  ],
  exports: [
    FormProductComponent
  ]
})
export class FormProductModule { }
