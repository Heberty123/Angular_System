import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import { AddDependentComponent } from '../dialogs/add-dependent/add-dependent.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';


let complexColumns: ObjToDisplayColumns[] = [
  { key: 'name', label: 'Nome' },
  { key: 'cpf', label: 'CPF' }
]

@Component({
  selector: 'dependents',
  standalone: true,
  imports: [
    CommonModule,
    TableEntitiesComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dependents.component.html',
  styleUrl: './dependents.component.css'
})
export class DependentsComponent implements OnInit {

  @Input('id') customerID!: number;
  data: Customer[] = [];
  displayColumns: ObjToDisplayColumns[] = complexColumns;
  loading: boolean = true;

  constructor(private _customerService: CustomerService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDependents()
  }

  loadDependents(): void {
    this._customerService.findDependentsByCustomer(this.customerID)
    .subscribe({
      next: (dependents: Customer[]) => {
        this.data = dependents;
        this.loading = false;
      }
    })
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
    this._customerService.addDependent(customer, this.customerID)
      .subscribe({
        next: (dependent: Customer) => {
          this.data.push(dependent);
          this.data = [...this.data];
        }
      })
  }
}
