import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipListbox, MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


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
    MatChipsModule,
    MatButtonModule,
    MatIconModule
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
  @Input() bttns: boolean = true
  selected: T;
  onChange: (value: T) => void
  onTouched: () => void;
  isDisabled: boolean;
  isRemovable: boolean = false
  @Output() addItemEvent = new EventEmitter<void>();
  @Output() remItemEvent = new EventEmitter<T>();

  constructor(){}

  ngAfterViewInit(): void {
    this.matChip.change.subscribe({
      next: ({value}: MatChipListboxChange) => this.onChange(value)
    })
  }

  compareFn(one: T, two: T): boolean {
    console.log(`one: ${one} === two: ${two}`);
    return one['id'] === two['id'];
  }
  
  writeValue(obj: T): void {
    console.log(obj);
    this.selected = obj;
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
