import { Component, forwardRef, Input } from '@angular/core';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS, 
  Validator, 
  ValidationErrors, 
  AbstractControl 
} from '@angular/forms';

@Component({
  selector: 'app-mat-datepicker-wrapper',
  templateUrl: './mat-datepicker-wrapper.component.html',
  styleUrls: ['./mat-datepicker-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatDatepickerWrapperComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MatDatepickerWrapperComponent),
      multi: true
    }
  ]
})
export class MatDatepickerWrapperComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() control: AbstractControl<any, any> | null;

  value: string | null;

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.invalid ? { invalid: true } : null;
  }

  onDateChange(event: any): void {
    this.value = event.value;
    this.writeValue(event.value);
    this.onChange(this.value);
    this.onTouched();
  }

  handleFocus(): void {
    this.onTouched();
  }

  get errorState(): boolean | undefined {
    return this.control?.invalid && this.control?.touched;
  }
}