import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/shared/interfaces/payment';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { MatSortModule } from '@angular/material/sort';
import { InputDateComponent } from '../../inputs/input-date/input-date.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdvanceChipListboxComponent } from '../../mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { BusinessLogicServiceService } from 'src/app/shared/services/business-logic-service.service';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PaymentType } from 'src/app/shared/interfaces/paymentType';

@Component({
  selector: 'table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('700ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('fadeInOut', [transition('* <=> void', animate(0))]),
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsBasics,
    MatSortModule,
    InputDateComponent,
    MatExpansionModule,
    MatIconModule,
    AdvanceChipListboxComponent,
  ],
})
export class TablePaymentComponent implements OnInit, AfterViewInit {

  @Input() paymentTypes?: PaymentType[];
  @Input() paintPayed?: boolean;
  @Input() changePayment: (total: number, value: number) => void;
  @Output() rowClicked = new EventEmitter<Payment>();
  // ['amount', 'paymentDate', 'paymentType', 'payedAt', 'amountPayed', 'expand', 'options'];
  columnsToDisplayWithExpand: string[];
  dataSource = new MatTableDataSource<Payment>([]);
  isEditable: boolean = false;
  inputAmount = new FormControl();
  inputInstallment = new FormControl();
  chipPaymentType: FormControl
  indexToEditAmount: number | null;
  expandedElement: Payment | null;

  constructor(private businessLogicService: BusinessLogicServiceService) {}

  @ViewChild(MatSort) private sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.chipPaymentType = new FormControl(this.paymentTypes)

    this.chipPaymentType.valueChanges.subscribe({
      next: (value: PaymentType) => this.expandedElement!.paymentType = value
    })

    this.inputInstallment.valueChanges.subscribe({
      next: (value: number) => {
        this.changePayment(value ? this.expandedElement!.amount : 0, value);
      }
    })
  }

  @Input() set payments(payments: Payment[] | undefined) {
    if(payments)
      this.dataSource.data = payments
  }

  startEditing(payment: Payment, index: number): void {
    this.inputAmount.setValue(payment.amount);
    this.indexToEditAmount = index;
  }

  lostEditing(): void {
    this.businessLogicService.updateInstallments(
      this.dataSource.data,
      +this.inputAmount.value,
      this.indexToEditAmount!
    );
    this.inputAmount.reset();
    this.indexToEditAmount = null;
  }

  @Input() set editable(value: boolean) {
    this.isEditable = value;
  }

  @Input() set displayColumns(value: string[]) {
    this.columnsToDisplayWithExpand = value;
  }


  expandedCanceled(): void {
    this.expandedElement!.paymentType = undefined;
    this.inputInstallment.reset();
    this.expandedElement = null;
  }

  expandedPayNow(): void {
    if (this.expandedElement!.paymentType != undefined &&
        this.expandedElement!.amount <= +this.inputInstallment.value) {

      this.expandedElement!.amountPayed = +this.inputInstallment.value;
      this.expandedElement!.paid = true;
      this.expandedElement = null;
      this.inputInstallment.reset();
    }
  }
} 
