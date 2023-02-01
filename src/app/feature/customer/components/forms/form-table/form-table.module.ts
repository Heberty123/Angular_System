import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { FormTableComponent } from './form-table.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [FormTableComponent],
  imports: [
    CommonModule,
    FormsBasics,
    MatButtonToggleModule
  ],
  exports: [FormTableComponent]
})
export class FormTableModule { }
