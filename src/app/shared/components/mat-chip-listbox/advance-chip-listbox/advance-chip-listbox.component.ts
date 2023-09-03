import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipListbox, MatChipListboxChange, MatChipsModule } from '@angular/material/chips';


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
export class AdvanceChipListboxComponent<T extends HasDisplayProperty>
  implements ControlValueAccessor, AfterViewInit {

  @ViewChild('matChip') matChip: MatChipListbox
  @Input() data: T[];
  @Input() displayProperty: keyof T = 'name';
  onChange: (value: T) => void
  onTouched: () => void;
  isDisabled: boolean;

  constructor(){}

  ngAfterViewInit(): void {
    this.matChip.change.subscribe({
      next: ({value}: MatChipListboxChange) => this.onChange(value)
    })
  }
  
  writeValue(obj: T[]): void {
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
