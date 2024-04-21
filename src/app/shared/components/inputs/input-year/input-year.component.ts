import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import moment, { Moment } from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'input-year',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-year.component.html',
  styleUrl: './input-year.component.css',
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
export class InputYearComponent {

  range = new FormGroup({
    start: new FormControl<Moment | null>(moment().startOf('month')),
    end: new FormControl<Moment | null>(moment().endOf('month')),
  });
  date = new FormControl(moment());
  @Output() change = new EventEmitter<number>();

  chosenYearHandler(normalizedYear: Moment, dp: any) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    this.change.emit(ctrlValue?.year());
  }
}
