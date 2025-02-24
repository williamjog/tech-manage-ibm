import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerWrapperComponent } from './mat-datepicker-wrapper.component';
import { MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('MatDatepickerWrapperComponent', () => {
  let component: MatDatepickerWrapperComponent;
  let fixture: ComponentFixture<MatDatepickerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MatDatepickerWrapperComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatDialogModule,
        MatNativeDateModule,
        NoopAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatepickerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('2025-02-21');
    expect(component.value).toBe('2025-02-21');
  });

  it('should call onChange when date is changed', () => {
    const newValue = '2025-02-21';
    spyOn(component, 'onChange');
    component.onDateChange({ value: newValue } as MatDatepickerInputEvent<any>);
    expect(component.onChange).toHaveBeenCalledWith(newValue);
  });

  it('should call onTouched when touched', () => {
    spyOn(component, 'onTouched');
    component.onTouched();
    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should update value on date change', () => {
    const mockEvent = { value: '2025-02-21' } as MatDatepickerInputEvent<any>;
    component.onDateChange(mockEvent);
    expect(component.value).toBe('2025-02-21');
  });

  it('should render the datepicker input field', () => {
    const input = fixture.debugElement.query(By.css('input[matInput]'));
    expect(input).toBeTruthy();
  });

  it('should render the datepicker toggle button', () => {
    const toggle = fixture.debugElement.query(By.css('mat-datepicker-toggle'));
    expect(toggle).toBeTruthy();
  });

  it('should render the mat-form-field container', () => {
    const formField = fixture.debugElement.query(By.css('mat-form-field'));
    expect(formField).toBeTruthy();
  });

  it('should have a label with "Data de Nascimento"', () => {
    component.label = 'Data de Nascimento';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('mat-label'));
    expect(label.nativeElement.textContent.trim()).toBe('Data de Nascimento');
  });

  it('should contain a datepicker element in the DOM', () => {
    const datepicker = fixture.debugElement.query(By.css('mat-datepicker'));
    expect(datepicker).toBeTruthy();
  });

});