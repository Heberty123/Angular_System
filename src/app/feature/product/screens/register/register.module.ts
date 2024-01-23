import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormProductModule } from '../../components/forms/form-product/form-product.module';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormProductModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
