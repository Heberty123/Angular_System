import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AdvanceChipListboxComponent } from 'src/app/shared/components/mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AdvanceChipListboxComponent,
    FormsBasics,
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
