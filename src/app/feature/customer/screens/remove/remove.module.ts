import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDeleteModule } from '../../components/tables/table-delete/table-delete.module';
import { RemoveComponent } from './remove.component';



@NgModule({
  declarations: [RemoveComponent],
  imports: [
    CommonModule,
    TableDeleteModule
  ],
  exports: [RemoveComponent]
})
export class RemoveModule { }
