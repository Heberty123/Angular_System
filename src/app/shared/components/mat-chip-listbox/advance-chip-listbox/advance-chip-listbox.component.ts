import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';


export interface HasDisplayProperty {
  [key: string]: any;
}


@Component({
  selector: 'advance-chip-listbox',
  templateUrl: './advance-chip-listbox.component.html',
  styleUrls: ['./advance-chip-listbox.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatChipsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AdvanceChipListboxComponent,
      multi: true
    }
  ]
})
export class AdvanceChipListboxComponent<T extends HasDisplayProperty> implements ControlValueAccessor {

  @Input() source?: T[];
  @Input() displayProperty: keyof T = 'name';
  onChange: (value: T) => void
  onTouched: () => void;
  disabled: boolean;

  constructor(){}

  writeValue(obj: T): void {
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
