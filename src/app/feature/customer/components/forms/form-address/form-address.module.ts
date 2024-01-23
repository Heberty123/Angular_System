import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddressComponent } from './form-address.component';
import { FormsModule } from '../forms.module';



@NgModule({
  declarations: [FormAddressComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormAddressComponent]
})
export class FormAddressModule { }
