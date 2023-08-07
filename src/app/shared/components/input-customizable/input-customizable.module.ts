import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCustomizableComponent } from './input-customizable.component';
import { FormsBasics } from '../../modules/forms-basics.module';



@NgModule({
  declarations: [
    InputCustomizableComponent
  ],
  imports: [
    CommonModule,
    FormsBasics
  ],
  exports: [
    InputCustomizableComponent
  ]
})
export class InputCustomizableModule { }
