import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsBasics } from 'src/app/shared/modules/forms-basics.module';
import { InputDateComponent } from '../../inputs/input-date/input-date.component';
import { AdvanceChipListboxComponent } from '../../mat-chip-listbox/advance-chip-listbox/advance-chip-listbox.component';
import { PaymentType } from 'src/app/shared/interfaces/paymentType';
import { Payment } from 'src/app/shared/interfaces/payment';

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
export class TablePaymentComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data?: Payment[] = []
  @Input() paymentTypes?: PaymentType[];
  @Input() paintPayed?: boolean = true;
  @Output() rowClicked = new EventEmitter<Payment>();
  @ViewChild(MatSort) private sort: MatSort;
  displayedColumns: string[] = ['amount', 'paymentDate', 'paymentType', 'options', 'expand'];
  dataSource = new MatTableDataSource<Payment>([]);
  isEditable: boolean = false;
  inputAmount = new FormControl();
  chipPaymentType = new FormControl(null, [Validators.required]);
  expandedElement: Payment | null;

  constructor() {}


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["data"]) {
      this.dataSource.data = this.data!;
    }
  }


  @Input() set editable(value: boolean) {
    this.isEditable = value;
  }

  @Input() set displayColumns(value: string[]) {
    this.displayedColumns = value;
  }


  cancelExpanded(): void {
    this.resetControls();
    this.expandedElement = null;
  }

  expandedPay(payment: Payment): void {
    this.inputAmount.addValidators(Validators.min(payment.amount));
    if (this.isControlsValid()) {
        
      this.expandedElement!.paymentType = this.chipPaymentType.value!
      this.expandedElement!.amountPayed = this.inputAmount.value;
      this.expandedElement!.paid = true;
      this.cancelExpanded();
    }
  }

  private isControlsValid(): boolean {
    return this.chipPaymentType.valid
    && this.inputAmount.value !== 0
  }

  private resetControls(): void {
    this.inputAmount.reset();
    this.chipPaymentType.reset();
  }
} 
