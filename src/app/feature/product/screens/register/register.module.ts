import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { RegisterComponent } from './register.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsBasics,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
