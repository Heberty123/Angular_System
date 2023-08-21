import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-customizable',
  templateUrl: './input-customizable.component.html',
  styleUrls: ['./input-customizable.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomizableComponent),
      multi: true
    }
  ]
})
export class InputCustomizableComponent implements ControlValueAccessor {

  value: string;
  isDisabled: boolean;
  @Input() type: string = 'text';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() hint: string;
  onChange: (value: string) => void;
  onTouched: () => void;

  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
