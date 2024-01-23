import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as moment from 'moment';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InputDateComponent implements OnInit {

  @Input() value: string;
  @Input() subscript?: boolean;
  @Output() valueChange = new EventEmitter<string>();
  date: FormControl<moment.Moment | null>;

  constructor() { }


  ngOnInit(): void {
    this.date = new FormControl(moment(this.value));

    this.date.valueChanges.subscribe({
      next: (value: moment.Moment | null) => {
        if (value?.isValid) {
          this.valueChange.emit(value.format());
        }
      }
    })
  }



}
