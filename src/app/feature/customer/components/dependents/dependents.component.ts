import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { AddDependentComponent } from '../dialogs/add-dependent/add-dependent.component';

let complexColumns: ObjToDisplayColumns[] = [
  { key: 'name', label: 'Nome' },
  { key: 'cpf', label: 'CPF' }
]

@Component({
  selector: 'dependents',
  standalone: true,
  imports: [
    TableEntitiesComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dependents.component.html',
  styleUrl: './dependents.component.css'
})
export class DependentsComponent implements OnInit {

  @Input() customer: Customer;
  data: Customer[] = [];
  displayColumns: ObjToDisplayColumns[] = complexColumns;
  @Output() findDependent = new EventEmitter<Customer>();

  constructor(private _customerService: CustomerService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this._customerService.findAllDependentsByCustomer(this.customer)
    .subscribe({
      next: (dependents: Customer[]) => this.data = dependents
    })
    console.log("Eu fui chamado de novo");
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddDependentComponent)

    dialogRef.afterClosed().subscribe({
      next: (result: Customer) => {
        if(result) 
          this.addDependent(result);
      }
    });
  }

  addDependent(customer: Customer): void {
    this._customerService.addDependent(customer, this.customer)
      .subscribe({
        next: (dependent: Customer) => {
          this.data.push(dependent);
          this.data = [...this.data];
        }
      })
  }
}
