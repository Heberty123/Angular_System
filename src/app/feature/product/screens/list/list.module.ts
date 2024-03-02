import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TableEntitiesComponent
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
