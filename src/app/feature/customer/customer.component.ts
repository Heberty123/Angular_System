import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { MaterialBasicModule } from 'src/app/shared/modules/material-basic.module';
import { DetailsModule } from './screens/details/details.module';
import { ListModule } from './screens/list/list.module';
import { RegisterModule } from './screens/register/register.module';
import { RemoveModule } from './screens/remove/remove.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MaterialBasicModule,
    RegisterModule,
    ListModule, 
    RemoveModule,
    DetailsModule
  ],
  providers: []
})
export class CustomerComponent implements OnInit, OnDestroy{
  selectedCustomer: Customer | null;
  selectedTabIndex: number;

  constructor(){}
  
  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }
}
