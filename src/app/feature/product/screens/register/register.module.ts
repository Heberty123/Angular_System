import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { ProductFormComponent } from '../../components/forms/product-form/product-form.component';
import { RegisterComponent } from './register.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsBasics,
    ProductFormComponent,
    MatButtonModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
