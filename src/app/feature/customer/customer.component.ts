import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { MaterialBasicModule } from 'src/app/shared/modules/material-basic.module';
import { DetailsModule } from './screens/details/details.module';
import { ListModule } from './screens/list/list.module';
import { RegisterModule } from './screens/register/register.module';
import { RemoveModule } from './screens/remove/remove.module';
import { SelectedTabService } from './services/selected-tab.service';

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
  providers: [SelectedTabService]
})
export class CustomerComponent implements OnInit{
  indexTab: number | undefined;
  customerSelected?: Customer;

  constructor(private selectedTab: SelectedTabService){}
  
  ngOnInit(): void {
    this.selectedTab.getCustomerForDetails()
      .subscribe({
        next: (customer: Customer) => {
          this.indexTab = 3;
          this.customerSelected = customer;
        }
      });

    this.selectedTab.getTableCustomersTab()
      .subscribe({
        next: () => {
          this.indexTab = 1;
          this.customerSelected = undefined;
        }
      });
  }
  
  tabLeaving(event: any) {
    if(event.index != 3 && this.indexTab === 3)
      this.customerSelected = undefined;
    this.indexTab = event.index;
  }
}
