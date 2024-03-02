import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialBasicModule } from 'src/app/shared/modules/material-basic.module';
import { ListModule } from './screens/list/list.module';
import { RegisterModule } from './screens/register/register.module';
import { RemoveModule } from './screens/remove/remove.module';
import { DetailsModule } from './screens/details/details.module';
import { SimpleProduct } from 'src/app/shared/classes/SimpleProduct';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MaterialBasicModule,
    RegisterModule,
    ListModule,
    RemoveModule,
    DetailsModule
  ]
})
export class ProductComponent {

  selectedProduct: SimpleProduct | null;

  constructor(){}


}
