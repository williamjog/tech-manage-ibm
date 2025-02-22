import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-mat-datepicker-wrapper',
  templateUrl: './mat-datepicker-wrapper.component.html',
  styleUrls: ['./mat-datepicker-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatDatepickerWrapperComponent),
      multi: true,
    },
  ]
})
export class MatDatepickerWrapperComponent implements OnInit, ControlValueAccessor {

  @Input() control: FormControl;

  value: string | null = null;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}

  onDateChange(event: MatDatepickerInputEvent<any>): void {
    this.control.setValue(event.value);
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.value = event.value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value || null;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
