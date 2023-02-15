import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsBasics, 
    SharedModule,
  ],
  exports: [    
    FormsBasics, 
    SharedModule,
  ],
  providers: []
})
export class FormsModule { }
