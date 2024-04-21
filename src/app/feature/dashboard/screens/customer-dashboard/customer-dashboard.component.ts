import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ObjToDisplayColumns, TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { CustomerPurchase } from 'src/app/shared/interfaces/CustomerPurchase';
import { DefaultingCustomer } from 'src/app/shared/interfaces/DefaultingCustomer';
import { CustomerService } from 'src/app/shared/resources/customer.service';
import moment, { Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

let complexColumnsPurchase: ObjToDisplayColumns[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Nome' },
  { key: 'cpf', label: 'CPF' },
  { key: 'value', label: 'Valor', pipe: { type: 'currency' } },
  { key: 'qtyPayments', label: 'Pagamentos' }
]

let complexColumnsDefaulting: ObjToDisplayColumns[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Nome' },
  { key: 'cpf', label: 'CPF' },
  { key: 'pendingAmount', label: 'Valor pendente', pipe: { type: 'currency' } },
  { key: 'pendingPaymentTotal', label: 'Pagamentos pendentes' },
  { key: 'debtSince', label: 'Desde', pipe: { type: 'date' } },
]

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

@Component({
  selector: 'customer-dashboard',
  standalone: true,
  imports: [
    TableEntitiesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxChartsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CustomerDashboardComponent implements OnInit {

  purchases: CustomerPurchase[] = [];
  defaulting: DefaultingCustomer[] = [];
  displayColumnsPurchase: ObjToDisplayColumns[] = complexColumnsPurchase;
  displayColumnsDefaulting: ObjToDisplayColumns[] = complexColumnsDefaulting;
  range = new FormGroup({
    start: new FormControl<Moment | null>(moment().startOf('month')),
    end: new FormControl<Moment | null>(moment().endOf('month')),
  });
  constructor(private _customerService: CustomerService) {}

  ngOnInit(): void {
    this._customerService.getDefaulting().subscribe({
      next: (value: DefaultingCustomer[]) => this.defaulting = value })
    this._customerService.getPurchase().subscribe({
      next: (value: CustomerPurchase[]) => this.purchases = value })
  }

  search(): void {
    let start: Moment | null = this.range.get('start')!.value
    let end: Moment | null = this.range.get('end')!.value
    this._customerService.getPurchase(start!, end!).subscribe({
      next: (value: CustomerPurchase[]) => this.purchases = value })
  }

}
