import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { InteractionService } from '../../../screens/list/services/interaction.service';
import { SelectedTabService } from '../../../services/selected-tab.service';

@Component({
  selector: 'table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.css']
})
export class TableCustomerComponent {

  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['id', 'name', 'cpf'];

  constructor(private customerService: CustomerService,
    private interaction: InteractionService,
    private selectedTab: SelectedTabService){}

  ngOnInit(): void {
    this.customerService.findAll()
      .subscribe({
        next: (customers: Customer[]) => {
          this.dataSource = new MatTableDataSource<Customer>(customers);
        }
      })
    this.interaction.getValueChanged()
      .subscribe({
        next: (value: string) => {
          this.applyFilter(value);
        }
      })
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  clickAtRow(row: Customer): void {
    this.selectedTab.changeToCustomerDetails(row);
  }
}
