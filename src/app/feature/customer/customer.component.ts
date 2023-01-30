import { Component, OnDestroy, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialBasicModule } from 'src/app/shared/modules/material-basic.module';
import { ListModule } from './screens/list/list.module';
import { RegisterModule } from './screens/register/register.module';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    MaterialBasicModule,
    RegisterModule,
    ListModule
  ]
})
export class CustomerComponent{

  constructor(){}
}
